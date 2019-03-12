'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Armors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      armor:
      {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      shield:
      {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      size:
      {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      enhancement:
      {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      deflection:
      {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      natural:
      {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      insight:
      {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      profane:
      {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Armors');
  }
};
