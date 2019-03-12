'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Attacks', 'AttackGroupId', {
      type: Sequelize.INTEGER,
      references: {
        model: "AttackGroups",
        key: "id"
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Attacks', 'AttackGroupId');
  }
};
