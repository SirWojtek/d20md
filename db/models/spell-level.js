"use strict";

module.exports = function(sequelize, DataTypes) {
  var SpellLevel = sequelize.define('SpellLevel', {
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: 'Level cannot be lower than 0',
        },
        max: {
          args: [9],
          msg: 'Level cannot be higher than 9',
        },
      },
    },
    class_name: {
      type: DataTypes.STRING,
      defaultValue: 'wizard'
    },
  });

  SpellLevel.afterBulkUpdate((level) => {
    if(!level.attributes.SpellId) {
      return SpellLevel.destroy(level);
    }
  });

  return SpellLevel;
};
