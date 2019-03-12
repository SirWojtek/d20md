'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Attacks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: Sequelize.STRING,
      attack_bonus:
      {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      attack_type:
      {
        type: Sequelize.ENUM,
        values: [
          'melee', 'ranged', 'melee touch', 'ranged touch'
        ],
        defaultValue: 'melee',
      },
      is_main: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      range:
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
    return queryInterface.dropTable('Attacks');
  }
};
