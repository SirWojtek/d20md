'use strict';

const models = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    // NOTE: because of hash function
    return models.User.bulkCreate([
      {
        email: 'momatoku+user@gmail.com',
        password: 'test',
        usertype: 'user',
        verificationCode: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'momatoku+admin@gmail.com',
        password: 'DevTest',
        usertype: 'admin',
        verificationCode: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users',
      { email: [ 'momatoku+user@gmail.com' ]});
  }
};
