"use strict";

module.exports = function(sequelize, DataTypes) {
  var textValidator = {
    len: {
      args: [0, 15000],
      msg: 'Description cannot be longer than 15000 characters',
    },
  };

  var FeatTemplate = sequelize.define('FeatTemplate', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [2, 100],
          msg: 'Name should be between 2 and 100 characters',
        },
      }
    },
    specialized_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    feat_type: {
      type: DataTypes.ENUM,
      values: [ 'general', 'creation', 'metamagic', 'divine', 'epic' ],
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
  });

  FeatTemplate.associate = function(models) {
    FeatTemplate.belongsToMany(models.Feat, {as: 'FeatPrerequisite', through: 'FeatTemplateToFeatPrerequisiteInstances'});
    FeatTemplate.belongsToMany(FeatTemplate, {as: 'FeatTemplatePrerequisite', through: 'FeatTemplateToFeatTemplatePrerequisiteInstances'});
    FeatTemplate.belongsTo(models.User);
  };

  return FeatTemplate;
};
