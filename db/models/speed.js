"use strict";

module.exports = function(sequelize, DataTypes) {
  var validator = {
    min: {
      args: [0],
      msg: 'Speed value cannot be lower than 0',
    },
    max: {
      args: [500],
      msg: 'Speed value cannot be higher than 500',
    },
  };

  var Speed = sequelize.define('Speed', {
    fly:
    {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    swim:
    {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    climb:
    {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    land:
    {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
    burrow:
    {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: validator,
    },
  });

  return Speed;
};
