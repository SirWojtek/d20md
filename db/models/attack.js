"use strict";

module.exports = function(sequelize, DataTypes) {
  var Attack = sequelize.define('Attack', {
    name: DataTypes.STRING,
    attack_bonus:
    {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: {
          args: [-20],
          msg: 'Attack bonus cannot be lower than -20',
        },
        max: {
          args: [120],
          msg: 'Attack bonus cannot be higher than 120',
        },
      },
    },
    attack_type:
    {
      type: DataTypes.ENUM,
      values: [
        'melee', 'ranged', 'melee touch', 'ranged touch'
      ],
      defaultValue: 'melee',
    },
    is_main: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    range:
    {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: 'Range cannot be lower than 0',
        },
        max: {
          args: [250],
          msg: 'Range cannot be higher than 250',
        },
      },
    },
  });

  Attack.afterUpdate((attack) => {
    if(!attack.attributes.AttackGroupId) {
      return Attack.destroy(attack);
    }
  });

  Attack.associate = function(models) {
    Attack.hasMany(models.Damage, {onDelete: 'cascade', hooks: true});
  };

  return Attack;
};
