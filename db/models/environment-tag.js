"use strict"

module.exports = function(sequelize, DataTypes) {
  var EnvironmentTag = sequelize.define('EnvironmentTag', {
    type: {
      type: DataTypes.ENUM,
      values: [
        'forest', 'marsh', 'hill', 'mountain', 'desert', 'plains', 'aquatic',
        'underground', 'dungeon', 'temperate', 'plane', 'chaotic', 'evil',
        'any', 'fire', 'water', 'earth', 'elemental', 'land', 'cold', 'warm',
        'ethereal', 'good', 'chaos', 'lawful', 'shadow', 'neutral', 'air', 'positive',
        'energy', 'urban', 'limbo'
      ],
      defaultValue: 'any'
    },
  });

  EnvironmentTag.afterUpdate((tag) => {
    if(!tag.attributes.MonsterId) {
      return EnvironmentTag.destroy(tag);
    }
  });

  return EnvironmentTag;
}
