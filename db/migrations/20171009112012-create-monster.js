'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Monsters', {
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
      type: {
        type: Sequelize.ENUM,
        values: [
          'aberration', 'animal', 'construct', 'dragon', 'elemental',
          'fey', 'giant', 'humanoid', 'monstrous humanoid',
          'magical beast', 'ooze', 'outsider', 'plant', 'undead', 'vermin'
        ],
        defaultValue: 'humanoid'
      },
      size: {
        type: Sequelize.ENUM,
        values: [
          'fine', 'diminutive', 'tiny', 'small',
          'medium', 'large', 'huge', 'gargantuan', 'colossal'
        ],
        defaultValue: 'medium'
      },
      hd_sum: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      armor_sum: {
        type: Sequelize.INTEGER,
        defaultValue: 10,
      },
      base_attack: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      grapple: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      attack_max: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      description: {
        type: Sequelize.TEXT,
        defaultValue: '',
      },
      hp: {
        type: Sequelize.INTEGER,
        defaultValue: 2,
      },
      initiative: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      challenge_rating: {
        type: Sequelize.INTEGER,
        deafultValue: 1,
      },
      organisation: {
        type: Sequelize.STRING,
        defaultValue: 'none',
      },
      treasure: {
        type: Sequelize.STRING,
        defaultValue: 'none',
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
    return queryInterface.dropTable('Monsters');
  }
};
