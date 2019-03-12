'use strict';

const fs = require('fs');
const models = require('../models');
const spellJson = JSON.parse(fs.readFileSync('tools/jsonOut/spell.json', 'utf8'));

function findSpell(name) {
  return spellJson.find(f => f.name.toLowerCase() === name.toLowerCase());
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    const query = {
      where: {
        spell_type: ''
      }
    };

    return models.Spell.findAll(query)
      .then(spells => {
        const updatedSpells = spells.map(spell => {
          const fromJson = findSpell(spell.name);
          if (!fromJson) {
            return null;
          }

          spell.spell_type = fromJson.spell_type;
          return spell.save();
        })
        .filter(f => !!f);
        return Promise.all(updatedSpells);
      });
  },

  down: (queryInterface, Sequelize) => {
    // NOTE: no way to rollback this
  }
};
