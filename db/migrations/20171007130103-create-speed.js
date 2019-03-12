'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Speeds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fly:
      {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      swim:
      {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      climb:
      {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      land:
      {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      burrow:
      {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Speeds');
  }
};
