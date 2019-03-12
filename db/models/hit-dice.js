"use strict";

const DEFAULT_INSTANCE = {
  hd_type: 4,
  hd_amount: 1,
  description: '',
};

module.exports = function(sequelize, DataTypes) {
  var HitDice = sequelize.define('HitDice', {
    hd_type: {
      type: DataTypes.INTEGER,
      defaultValue: DEFAULT_INSTANCE.hd_type,
      validate: {
        isIn: {
          args: [[ 2, 3, 4, 6, 8, 10, 12, 20 ]],
          msg: 'Valid dices: 2, 3, 4, 6, 8, 10, 12, 20',
        },
      },
    },
    hd_amount: {
      type: DataTypes.INTEGER,
      defaultValue: DEFAULT_INSTANCE.hd_amount,
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
    description: {
      type: DataTypes.STRING,
      defaultValue: DEFAULT_INSTANCE.description,
      validate: {
        len: {
          args: [0, 20],
          msg: 'Hit dice description cannot be longer than 20 characters',
        },
      },
    }
  });

  HitDice.getDefaultIntance = () => ({
    ...DEFAULT_INSTANCE,
  });

  HitDice.afterUpdate((hitDice) => {
    if(!hitDice.attributes.MonsterId) {
      return HitDice.destroy(hitDice);
    }
  });

  return HitDice;
};
