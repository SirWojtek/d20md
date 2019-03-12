'use strict';

const fs = require('fs');
const _ = require('lodash');
const models = require('../models');
const spellJson = JSON.parse(fs.readFileSync('tools/jsonOut/spell.json', 'utf8'));

function findSpell(name) {
  return spellJson.find(s => s.name === name);
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return models.Spell.findAll({
      attributes: [ 'id', 'name' ]
    }).then(spells => {
      const data = _.flatMap(spells, spell => {
        const jsonSpell = findSpell(spell.name);
        if (!jsonSpell) {
          return null;
        }

        return jsonSpell.SpellLevels.map(level => {
          return {
            ...level,
            SpellId: spell.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        });
      })
      .filter(s => !!s);

      return queryInterface.bulkInsert('SpellLevels', data);
    });
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      models.User.findOne({ where: { usertype: 'admin' }}),
      models.Spell.findAll({ attributes: [ 'UserId', 'id' ]})
    ])
    .then(records => {
      const admin = records[0];
      const spells = records[1];

      const idsToDelete = spells
        .filter(m => m.UserId == admin.id)
        .map(m => m.id);

      return queryInterface.bulkDelete('SpellLevels', { SpellId: idsToDelete });
    });
  }
};
