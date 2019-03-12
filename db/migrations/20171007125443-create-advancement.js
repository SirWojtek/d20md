'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Advancements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      min_hd: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      max_hd: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      size: {
        type: Sequelize.ENUM,
        values: [
          'fine', 'diminutive', 'tiny', 'small',
          'medium', 'large', 'huge', 'gargantuan', 'colossal'
        ],
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
    return queryInterface.dropTable('Advancements');
  }
};
