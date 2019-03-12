"use strict";

module.exports = function(sequelize, DataTypes) {
  var SpellDescriptor = sequelize.define('SpellDescriptor', {
    descriptor: {
      type: DataTypes.ENUM,
      values: [ 'todo' ]
    }
  });

  return SpellDescriptor;
};
