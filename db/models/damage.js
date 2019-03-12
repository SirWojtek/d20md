"use strict";

module.exports = function(sequelize, DataTypes) {
  var Damage = sequelize.define('Damage', {
    dd_type:
    {
      type: DataTypes.INTEGER,
      defaultValue: 2,
      validate: {
        isIn: {
          args: [[ 0, 2, 3, 4, 6, 8, 10, 12, 20 ]],
          msg: 'Valid dices: 0, 2, 3, 4, 6, 8, 10, 12, 20',
        },
      },
    },
    dd_amount:
    {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        min: {
          args: [0],
          msg: 'Damage dice amount cannot be lower than 0',
        },
        max: {
          args: [100],
          msg: 'Damage dice amount cannot be higher than 100',
        },
      },
    },
    damage_bonus:
    {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: {
          args: [-20],
          msg: 'Damage bonus cannot be lower than -20',
        },
        max: {
          args: [50],
          msg: 'Damage bonus cannot be higher than 50',
        },
      },
    },
    damage_type:
    {
      type: DataTypes.ENUM,
      values: [
        'bludgeoning', 'slashing', 'piercing',
        'acid', 'cold', 'electricity', 'fire', 'sonic',
        'force', 'negative', 'positive',
      ],
      defaultValue: 'slashing',
    },
    critical:
    {
      type: DataTypes.STRING,
      defaultValue: 'x2',
      validate: {
        len: {
          args: [0, 20],
          msg: 'Critical should be between 2 and 20 characters',
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [0, 50],
          msg: 'Description cannot be longer than 50 characters',
        },
      },
    },
  });

  Damage.afterUpdate((damage) => {
    if(!damage.attributes.AttackId) {
      return Damage.destroy(damage);
    }
  });

  return Damage;
};
