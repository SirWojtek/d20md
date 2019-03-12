'use strict';

const fs = require('fs');
const _ = require('lodash');
const models = require('../models');
const monsterJson = JSON.parse(fs.readFileSync('tools/jsonOut/monster.json', 'utf8'));

function findMonster(name) {
  return monsterJson.find(m => m.name === name);
}

function findSpellId(dbSpells, s) {
  const spell = dbSpells.find(spell => spell.name.toLowerCase() === s.toLowerCase());
  if (!spell) { throw Error('Cannot find spell ' + s); }
  return spell.id;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      models.Monster.findAll({ attributes: [ 'id', 'name' ] }),
      models.Spell.findAll({ attribtues: [ 'id', 'name' ] })
    ]).then(records => {
      const monsters = records[0];
      const spells = records[1];

      const data = _.flatMap(monsters, monster => {
        const jsonMonster = findMonster(monster.name);
        if (!jsonMonster) {
          return null;
        }

        return jsonMonster.Spells.map(spell => {
          return {
            MonsterId: monster.id,
            SpellId: findSpellId(spells, spell),
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        });
      })
      .filter(m => !!m);

      return queryInterface.bulkInsert('MonsterSpellInstances', data);
    });
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      models.User.findOne({ where: { usertype: 'admin' }}),
      models.Monster.findAll({ attributes: [ 'UserId', 'id' ]})
    ])
    .then(records => {
      const admin = records[0];
      const monsters = records[1];

      const idsToDelete = monsters
        .filter(m => m.UserId == admin.id)
        .map(m => m.id);

      return queryInterface.bulkDelete('MonsterSpellInstances', { MonsterId: idsToDelete });
    });
  }
};
;
