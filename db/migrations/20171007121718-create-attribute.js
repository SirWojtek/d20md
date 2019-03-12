'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Attributes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      strength:
      {
        type: Sequelize.INTEGER,
        defaultValue: 10,
      },
      dexterity:
      {
        type: Sequelize.INTEGER,
        defaultValue: 10,
      },
      constitution:
      {
        type: Sequelize.INTEGER,
        defaultValue: 10,
      },
      wisdom:
      {
        type: Sequelize.INTEGER,
        defaultValue: 10,
      },
      intelligence:
      {
        type: Sequelize.INTEGER,
        defaultValue: 10,
      },
      charisma:
      {
        type: Sequelize.INTEGER,
        defaultValue: 10,
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
    return queryInterface.dropTable('Attributes');
  }
};
