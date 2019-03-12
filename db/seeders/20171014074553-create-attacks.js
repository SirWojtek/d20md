'use strict';

const fs = require('fs');
const _ = require('lodash');
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
      let groupId = 1;
      const groups = _.flatMap(monsters, monster => {
        const jsonMonster = findMonster(monster.name);
        if (!jsonMonster) {
          return null;
        }
        jsonMonster.id = monster.id;

        return jsonMonster.AttackGroups.map(gr => {
          gr.id = groupId;
          return {
            id: groupId++,
            MonsterId: monster.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        });
      })
      .filter(m => !!m);

      return queryInterface.bulkInsert('AttackGroups', groups)
      .then(() => {
        let attackId = 1;
        const attacks = _.flatMap(monsterJson, monster => {
          return _.flatMap(monster.AttackGroups, gr => {
            return gr.Attacks.map(att => {
              att.id = attackId;
              return {
                id: attackId++,
                attack_type: att.attack_type,
                name: att.name,
                range: att.range,
                attack_bonus: att.attack_bonus,
                is_main: att.is_main,
                AttackGroupId: gr.id,
                createdAt: new Date(),
                updatedAt: new Date(),
              };
            });
          });
        });

        return queryInterface.bulkInsert('Attacks', attacks)
        .then(() => {
          const dmgId = 1;
          const damages = _.flatMap(monsterJson, monster => {
            return _.flatMap(monster.AttackGroups, gr => {
              return _.flatMap(gr.Attacks, attack => {
                return attack.Damages.map(dmg => {
                  return {
                    ...dmg,
                    AttackId: attack.id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  };
                });
              });
            });
          });

          return queryInterface.bulkInsert('Damages', damages);
        });
      });
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

      const monsterIdsToDelete = monsters
        .filter(m => m.UserId == admin.id)
        .map(m => m.id);

      return models.AttackGroup.findAll({ where: { MonsterId: monsterIdsToDelete }})
      .then(groups => {
        const groupIdsToDelete = groups.map(group => group.id);

        return models.Attack.findAll({ where: { AttackGroupId: groupIdsToDelete }})
        .then(attacks => {
          const attacksIdsToDelete = attacks.map(attack => attack.id);

          return models.Damage.findAll({ where: { AttackId: attacksIdsToDelete }})
          .then(dmgs => {
            const dmgIdsToDelete = dmgs.map(dmg => dmg.id);

            return queryInterface.bulkDelete('Damages', { id: dmgIdsToDelete })
            .then(() => queryInterface.bulkDelete('Attacks', { id: attacksIdsToDelete })
              .then(() => queryInterface.bulkDelete('AttackGroups', { id: groupIdsToDelete })));
          });
        });
      });
    });
  }
}
