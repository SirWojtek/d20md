'use strict';

const models = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return models.Monster.findAll({ attributes: [ 'id' ] })
    .then(monsters => {
      const data = monsters.map(monster => {
        return {
          path: '',
          MonsterId: monster.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });
      return queryInterface.bulkInsert('Images', data);
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

      return queryInterface.bulkDelete('Images', { MonsterId: idsToDelete });
    });
  }
};
