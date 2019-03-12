"use strict";

module.exports = function(sequelize, DataTypes) {
  var CastingTime = sequelize.define('CastingTime', {
    time: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [0],
          msg: 'Time cannot be lower than 0',
        },
        max: {
          args: [100],
          msg: 'Time cannot be higher than 100',
        },
      },
    },
    type: {
      type: DataTypes.ENUM,
      values: [ 'todo' ]
    }
  });

  return CastingTime;
};
