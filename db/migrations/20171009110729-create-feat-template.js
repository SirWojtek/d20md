'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FeatTemplates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      specialized_by: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      feat_type: {
        type: Sequelize.ENUM,
        values: [ 'general', 'creation', 'metamagic', 'divine', 'epic' ],
        defaultValue: 'general',
      },
      benefit: {
        type: Sequelize.TEXT,
      },
      normal: {
        type: Sequelize.TEXT,
      },
      special: {
        type: Sequelize.TEXT,
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
    return queryInterface.dropTable('FeatTemplates');
  }
};
