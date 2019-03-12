"use strict";

module.exports = function(sequelize, DataTypes) {
  var FeatTextPrerequisite = sequelize.define('FeatTextPrerequisite', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        args: [0, 100],
        msg: 'Feat text prerequisite cannot be longer than 100 characters',
      }
    }
  });

  return FeatTextPrerequisite;
};
