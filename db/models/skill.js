"use strict";

module.exports = function(sequelize, DataTypes) {
  var validator = {
    min: {
      args: [-20],
      msg: 'Skill modifier cannot be lower than -20',
    },
    max: {
      args: [150],
      msg: 'Skill modified cannot be higher than 150',
    },
  };

  var Skill = sequelize.define('Skill', {
    appraise: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    balance: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    bluff: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    climb: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    concentration: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    craft_alchemy: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    craft_armor: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    craft_bow: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    craft_weapon: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    craft_trap: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    craft_varies: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    decipher_script: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    diplomacy: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    disable_device: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    disguise: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    escape_artist: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    forgery: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    gather_information: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    handle_animal: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    heal: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    hide: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    intimidate: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    jump: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    knowledge_arcana: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    knowledge_architecture: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    knowledge_dungeon: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    knowledge_geography: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    knowledge_history: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    knowledge_local: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    knowledge_nature: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    knowledge_nobility: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    knowledge_religion: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    knowledge_planes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    listen: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    move_silently: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    open_lock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    perform: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    psicraft: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    profession: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    ride: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    search: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    sense_motive: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    sleight_of_hand: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    spellcraft: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    spot: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    survival: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    swim: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    tumble: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    use_magic_device: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    use_rope: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
  });

  return Skill;
};
