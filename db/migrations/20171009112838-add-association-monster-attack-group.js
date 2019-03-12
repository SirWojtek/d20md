'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('AttackGroups', 'MonsterId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Monsters",
        key: "id"
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('AttackGroups', 'MonsterId');
  }
};
