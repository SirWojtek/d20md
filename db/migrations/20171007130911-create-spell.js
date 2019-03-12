'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Spells', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(128),
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
      },
      save_type: {
        type: Sequelize.ENUM,
        values: [ 'none', 'reflex', 'fortitude', 'will' ],
        defaultValue: 'none',
      },
      permits_sr: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      spell_type: {
        type: Sequelize.ENUM,
        values: [ 'abjuration', 'conjuration', 'divination', 'enchantment', 'evocation', 'illusion', 'necromancy', 'transmitation' ],
      },
      spell_range: {
        type: Sequelize.ENUM,
        values: [ 'none', 'personal', 'touch', 'close', 'medium', 'long', 'unlimited', 'custom' ],
      },
      range_info: {
        type: Sequelize.STRING,
      },
      target: {
        type: Sequelize.STRING,
      },
      duration: {
        type: Sequelize.STRING,
      },
      material_component: {
        type: Sequelize.STRING,
      },
      area: {
        type: Sequelize.STRING,
      },
      effect: {
        type: Sequelize.STRING,
      },
      xp_cost: {
        type: Sequelize.STRING,
      },
      to_develop: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('Spells');
  }
};
