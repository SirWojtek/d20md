"use strict";

module.exports = function(sequelize, DataTypes) {
  var validator = {
    min: {
      args: [0],
      msg: 'Armor value cannot be lower than 0',
    },
    max: {
      args: [100],
      msg: 'Armor value cannot be higher than 100',
    }
  };

  var Armor = sequelize.define('Armor', {
    armor:
    {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    shield:
    {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    size:
    {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: {
          args: [-20],
          msg: 'Size value cannot be lower than -20',
        },
        max: {
          args: [10],
          msg: 'Size value cannot be higher than 10',
        }
      },
    },
    enhancement:
    {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    deflection:
    {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    natural:
    {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    insight:
    {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    profane:
    {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
  });

  return Armor;
};
