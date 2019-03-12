"use strict";

module.exports = function(sequelize, DataTypes) {
  var AttackGroup = sequelize.define('AttackGroup');

  AttackGroup.afterUpdate((attackGroup) => {
    if(!attackGroup.attributes.MonsterId) {
      return AttackGroup.destroy(attackGroup);
    }
  });

  AttackGroup.associate = function(models) {
    AttackGroup.hasMany(models.Attack, {onDelete: 'cascade', hooks: true});
  };

  return AttackGroup;
};
