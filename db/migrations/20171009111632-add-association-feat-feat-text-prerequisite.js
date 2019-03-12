'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('FeatTextPrerequisites', 'FeatId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Feats",
        key: "id"
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('FeatTextPrerequisites', 'FeatId');
  }
};
