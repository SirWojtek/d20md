'use strict';

const models = require('../models');

function toMod(val) {
  return Math.floor((val - 10) / 2);
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      models.Monster.findAll({ attributes: [ 'id' ]}),
      models.Save.findAll(),
      models.Attribute.findAll()
    ])
      .then(([ monsters, saves, attributes ]) => {
        const updates = monsters.map(monster => {
          const monsterSave = saves.find(s => s.MonsterId === monster.id);
          const monsterAttribute = attributes.find(a => a.MonsterId === monster.id);

          monsterSave.will -= toMod(monsterAttribute.wisdom);
          monsterSave.reflex -= toMod(monsterAttribute.dexterity);
          monsterSave.fortitude -= toMod(monsterAttribute.constitution);

          return monsterSave.save();
        });

        return Promise.all(updates);
      });
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      models.Monster.findAll({ attributes: [ 'id' ]}),
      models.Save.findAll(),
      models.Attribute.findAll()
    ])
      .then(([ monsters, saves, attributes ]) => {
        const updates = monsters.map(monster => {
          const monsterSave = saves.find(s => s.MonsterId === monster.id);
          const monsterAttribute = attributes.find(a => a.MonsterId === monster.id);

          monsterSave.will += toMod(monsterAttribute.wisdom);
          monsterSave.reflex += toMod(monsterAttribute.dexterity);
          monsterSave.fortitude += toMod(monsterAttribute.constitution);

          return monsterSave.save();
        });

        return Promise.all(updates);
      });
  }
};
