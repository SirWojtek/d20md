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
      const data = _.flatMap(monsters, monster => {
        const jsonMonster = findMonster(monster.name);
        if (!jsonMonster) {
          return null;
        }

        return jsonMonster.Specials.map(special => {
          return {
            ...special,
            MonsterId: monster.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        });
      })
      .filter(m => !!m);

      return queryInterface.bulkInsert('Specials', data);
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

      return queryInterface.bulkDelete('Specials', { MonsterId: idsToDelete });
    });
  }
};
