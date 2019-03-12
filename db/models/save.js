"use strict";

const DEFAULT_INSTANCE = {
  will: 3,
  reflex: 3,
  fortitude: 3,
};

module.exports = function(sequelize, DataTypes) {
  var validator = {
    min: {
      args: [0],
      msg: 'Save throw cannot be lower than 0',
    },
    max: {
      args: [100],
      msg: 'Save throw cannot be higher than 100',
    },
  };

  var Save = sequelize.define('Save', {
    will:
    {
      type: DataTypes.INTEGER,
      defaultValue: DEFAULT_INSTANCE.will,
      validate: validator,
    },
    reflex:
    {
      type: DataTypes.INTEGER,
      defaultValue: DEFAULT_INSTANCE.reflex,
      validate: validator,
    },
    fortitude:
    {
      type: DataTypes.INTEGER,
      defaultValue: DEFAULT_INSTANCE.fortitude,
      validate: validator,
    }
  });

  Save.getDefaultIntance = () => ({
    ...DEFAULT_INSTANCE,
  });

  return Save;
};
