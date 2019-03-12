'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Damages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dd_type:
      {
        type: Sequelize.INTEGER,
        defaultValue: 2,
      },
      dd_amount:
      {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      damage_bonus:
      {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      damage_type:
      {
        type: Sequelize.ENUM,
        values: [
          'bludgeoning', 'slashing', 'piercing',
          'acid', 'cold', 'electricity', 'fire', 'sonic',
          'force', 'negative', 'positive', 'other',
        ],
        defaultValue: 'slashing',
      },
      critical:
      {
        type: Sequelize.STRING,
        defaultValue: 'x2',
      },
      description: {
        type: Sequelize.TEXT,
        defaultValue: '',
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
    return queryInterface.dropTable('Damages');
  }
};
