'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Images', 'MonsterId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Monsters",
        key: "id"
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Images', 'MonsterId');
  }
};
