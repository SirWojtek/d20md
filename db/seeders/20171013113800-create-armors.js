'use strict';

const fs = require('fs');
const models = require('../models');
const monsterJson = JSON.parse(fs.readFileSync('tools/jsonOut/monster.json', 'utf8'));

function findMonster(name) {
  return monsterJson.find(m => m.name === name);
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return models.Monster.findAll({
      attributes: [ 'id', 'name' ]
    }).then(monsters => {
      const data = monsters.map(monster => {
        const jsonMonster = findMonster(monster.name);
        if (!jsonMonster) {
          return null;
        }

        return {
          armor: jsonMonster.Armor.armor || 0,
          shield: jsonMonster.Armor.shield || 0,
          size: jsonMonster.Armor.size || 0,
          enhancement: jsonMonster.Armor.enhancement || 0,
          deflection: jsonMonster.Armor.deflection || 0,
          natural: jsonMonster.Armor.natural || 0,
          insight: jsonMonster.Armor.insight || 0,
          profane: jsonMonster.Armor.profane || 0,
          MonsterId: monster.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      })
      .filter(toSave => !!toSave);

      return queryInterface.bulkInsert('Armors', data);
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

      return queryInterface.bulkDelete('Armors', { MonsterId: idsToDelete });
    });
  }
};
