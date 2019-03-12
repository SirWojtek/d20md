"use strict";

module.exports = function(sequelize, DataTypes) {
  var Advancement = sequelize.define('Advancement', {
    min_hd: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        min: {
          args: [1],
          msg: 'Hit dice amount cannot be lower than 1',
        },
        max: {
          args: [100],
          msg: 'Hit dice amount cannot be higher than 100',
        },
      },
    },
    max_hd: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        min: {
          args: [1],
          msg: 'Hit dice amount cannot be lower than 1',
        },
        max: {
          args: [100],
          msg: 'Hit dice amount cannot be higher than 100',
        },
      },
    },
    size: {
      type: DataTypes.ENUM,
      values: [
        'fine', 'diminutive', 'tiny', 'small',
        'medium', 'large', 'huge', 'gargantuan', 'colossal'
      ],
    }
  });

  return Advancement;
}
