'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('EnvironmentTags', 'MonsterId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Monsters",
        key: "id"
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('EnvironmentTags', 'MonsterId');
  }
};
