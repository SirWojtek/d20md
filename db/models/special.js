"use strict";

module.exports = function(sequelize, DataTypes) {
  var Special = sequelize.define('Special', {
    type: {
      type: DataTypes.ENUM,
      values: [ 'extraordinary', 'spell-like', 'supernatural' ],
      defaultValue: 'extraordinary',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name cannot be empty",
        },
        len: {
          args: [2, 100],
          msg: 'Name should be between 2 and 100 characters',
        }
      },
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [0, 1000],
          msg: 'Description cannot be longer than 1000 characters',
        },
      },
    }
  });

  Special.afterUpdate((special) => {
    if(!special.attributes.MonsterId) {
      return Special.destroy(special);
    }
  });

  return Special;
};
