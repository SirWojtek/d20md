'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Damages', 'AttackId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Attacks",
        key: "id"
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Damages', 'AttackId');
  }
};
