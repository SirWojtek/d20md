"use strict";

module.exports = function(sequelize, DataTypes) {
  var SpellComponent = sequelize.define('SpellComponent', {
    value: {
      type: DataTypes.ENUM,
      values: [ 'verbal', 'somatic', 'material', 'xp', 'focus', 'divine focus', 'material/divine focus', 'focus/divine focus', 'ritual' ],
    }
  });

  SpellComponent.afterBulkUpdate((component) => {
    if(!component.attributes.SpellId) {
      return SpellComponent.destroy(component);
    }
  });

  return SpellComponent;
};
