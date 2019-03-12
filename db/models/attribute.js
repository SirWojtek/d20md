"use strict";

const DEFAULT_INSTANCE = {
  strength: 10,
  dexterity: 10,
  constitution: 10,
  wisdom: 10,
  intelligence: 10,
  charisma: 10,
};

module.exports = function(sequelize, DataTypes) {
  var validator = {
    min: {
      args: [0],
      msg: 'Ability value cannot be lower than 0',
    },
    max: {
      args: [100],
      msg: 'Ability value cannot be higher than 100',
    },
  };

  var Attribute = sequelize.define('Attribute', {
    strength: {
      type: DataTypes.INTEGER,
      defaultValue: DEFAULT_INSTANCE.strength,
      validate: validator,
    },
    dexterity: {
      type: DataTypes.INTEGER,
      defaultValue: DEFAULT_INSTANCE.dexterity,
      validate: validator,
    },
    constitution: {
      type: DataTypes.INTEGER,
      defaultValue: DEFAULT_INSTANCE.constitution,
      validate: validator,
    },
    wisdom: {
      type: DataTypes.INTEGER,
      defaultValue: DEFAULT_INSTANCE.wisdom,
      validate: validator,
    },
    intelligence: {
      type: DataTypes.INTEGER,
      defaultValue: DEFAULT_INSTANCE.intelligence,
      validate: validator,
    },
    charisma: {
      type: DataTypes.INTEGER,
      defaultValue: DEFAULT_INSTANCE.charisma,
      validate: validator,
    }
  });

  Attribute.getDefaultIntance = () => ({
    ...DEFAULT_INSTANCE,
  });

  return Attribute;
};
