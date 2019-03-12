"use strict";

module.exports = function(sequelize, DataTypes) {
  var textValidator = {
    len: {
      args: [0, 15000],
      msg: 'Description cannot be longer than 15000 characters',
    },
  };

  var Feat = sequelize.define('Feat', {
    name: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
      validate: {
        len: {
          args: [2, 100],
          msg: 'Name should be between 2 and 100 characters',
        }
      },
    },
    feat_type: {
      type: DataTypes.ENUM,
      values: [ 'general', 'creation', 'metamagic', 'divine', 'epic', 'psionic', 'metapsionic', 'wild', 'special' ],
      defaultValue: 'general',
    },
    benefit: {
      type: DataTypes.TEXT,
      validate: textValidator,
    },
    normal: {
      type: DataTypes.TEXT,
      validate: textValidator,
    },
    special: {
      type: DataTypes.TEXT,
      validate: textValidator,
    },
    multiple: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    stack: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    views: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
  });

  Feat.associate = function(models) {
    Feat.belongsToMany(Feat, {as: 'Prerequisite', through: 'FeatPrerequisiteInstances'});
    Feat.belongsToMany(models.Monster, {through: 'MonsterFeatInstances'});
    Feat.belongsToMany(models.User, { as: 'FeatViewLogs', through: 'FeatViewLog' });

    Feat.hasMany(models.FeatTextPrerequisite, {onDelete: 'cascade', hooks: true});

    Feat.belongsTo(models.User);
  };

  return Feat;
};
