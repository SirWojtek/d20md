'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EnvironmentTags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.ENUM,
        values: [
          'forest', 'marsh', 'hill', 'mountain', 'desert', 'plains', 'aquatic',
          'underground', 'dungeon', 'temperate', 'plane', 'chaotic', 'evil',
          'any', 'fire', 'water', 'earth', 'elemental', 'land', 'cold', 'warm',
          'ethereal', 'good', 'chaos', 'lawful', 'shadow', 'neutral', 'air', 'positive',
          'energy', 'urban', 'limbo'
        ],
        defaultValue: 'any'
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
    return queryInterface.dropTable('EnvironmentTags');
  }
};
