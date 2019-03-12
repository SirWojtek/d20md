"use strict";

module.exports = function(sequelize, DataTypes) {
  var Alignment = sequelize.define('Alignment', {
    descriptor: {
      type: DataTypes.ENUM,
      values: [ 'lawful', 'neutral', 'chaotic', 'good', 'evil' ]
    }
  });

  return Alignment;
}
