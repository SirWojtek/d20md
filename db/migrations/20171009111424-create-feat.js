'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Feats', {
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
      feat_type: {
        type: Sequelize.ENUM,
        values: [ 'general', 'creation', 'metamagic', 'divine', 'epic', 'psionic', 'metapsionic', 'wild', 'special' ],
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
      multiple: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      stack: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    return queryInterface.dropTable('Feats');
  }
};
