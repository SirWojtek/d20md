'use strict';

const fs = require('fs');
const models = require('../models');
const spellJson = JSON.parse(fs.readFileSync('tools/jsonOut/spell.json', 'utf8'));

module.exports = {
  up: (queryInterface, Sequelize) => {
    return models.User.findOne({ where: { usertype: 'admin' }})
    .then(admin => {
      const data = spellJson.map(spell => {
        return {
          name: spell.name,
          description: spell.description,
          save_type: spell.save_type,
          permits_sr: spell.permits_sr,
          spell_type: spell.spell_type,
          spell_range: spell.spell_range,
          range_info: spell.range_info,
          target: spell.target,
          duration: spell.duration,
          material_component: spell.material_component,
          area: spell.area,
          effect: spell.effect,
          xp_cost: spell.xp_cost,
          to_develop: spell.to_develop,
          UserId: admin.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });

      return queryInterface.bulkInsert('Spells', data);
    });
  },

  down: (queryInterface, Sequelize) => {
    return models.User.findOne({ where: { usertype: 'admin' }})
    .then(admin => {
      return queryInterface.bulkDelete('Spells', { UserId: admin.id });
    });
  }
};
