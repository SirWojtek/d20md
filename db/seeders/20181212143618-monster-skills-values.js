'use strict';

const models = require('../models');
const skillAttributes = require('../utils/skillAttributes');

function toMod(val) {
  return Math.floor((val - 10) / 2);
}

const skillAttributesToFilter = [ 'id', 'MonsterId', 'createdAt', 'updatedAt' ];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      models.Monster.findAll({ attributes: [ 'id' ]}),
      models.Skill.findAll(),
      models.Attribute.findAll()
    ])
      .then(([ monsters, skills, attributes ]) => {
        const updates = monsters.map(monster => {
          const monsterSkill = skills.find(s => s.MonsterId === monster.id);
          const monsterAttribute = attributes.find(a => a.MonsterId === monster.id);

          monsterSkill.attributes
            .filter(attr => !skillAttributesToFilter.includes(attr))
            .filter(attr => monsterSkill[attr])
            .forEach(attr => {
              const attributeVal = monsterAttribute[skillAttributes[attr]];
              monsterSkill[attr] -= toMod(attributeVal);
            });

          return monsterSkill.save();
        });

        return Promise.all(updates);
      });
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      models.Monster.findAll({ attributes: [ 'id' ]}),
      models.Skill.findAll(),
      models.Attribute.findAll()
    ])
      .then(([ monsters, skills, attributes ]) => {
        const updates = monsters.map(monster => {
          const monsterSkill = skills.find(s => s.MonsterId === monster.id);
          const monsterAttribute = attributes.find(a => a.MonsterId === monster.id);

          monsterSkill.attributes
            .filter(attr => !skillAttributesToFilter.includes(attr))
            .filter(attr => monsterSkill[attr])
            .forEach(attr => {
              const attributeVal = monsterAttribute[skillAttributes[attr]];
              monsterSkill[attr] += toMod(attributeVal);
            });

          return monsterSkill.save();
        });

        return Promise.all(updates);
      });
  }
};
