'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Skills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      appraise: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      balance: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      bluff: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      climb: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      concentration: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      craft_alchemy: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      craft_armor: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      craft_bow: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      craft_weapon: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      craft_trap: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      craft_varies: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      decipher_script: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      diplomacy: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      disable_device: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      disguise: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      escape_artist: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      forgery: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      gather_information: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      handle_animal: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      heal: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      hide: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      intimidate: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      jump: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      knowledge_arcana: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      knowledge_architecture: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      knowledge_dungeon: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      knowledge_geography: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      knowledge_history: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      knowledge_local: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      knowledge_nature: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      knowledge_nobility: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      knowledge_religion: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      knowledge_planes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      listen: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      move_silently: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      open_lock: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      perform: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      psicraft: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      profession: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      ride: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      search: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      sense_motive: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      sleight_of_hand: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      spellcraft: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      spot: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      survival: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      swim: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      tumble: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      use_magic_device: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      use_rope: {
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
    return queryInterface.dropTable('Skills');
  }
};
