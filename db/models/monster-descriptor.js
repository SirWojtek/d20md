"use strict";

module.exports = function(sequelize, DataTypes) {
  var MonsterDescriptor = sequelize.define('MonsterDescriptor', {
    descriptor: {
      type: DataTypes.ENUM,
      values: [ 'extraplanar', 'air', 'fire' ]
    }
  });

  return MonsterDescriptor;
};
