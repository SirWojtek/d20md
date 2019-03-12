'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
    ALTER TABLE Damages MODIFY damage_type enum(
      'bludgeoning', 'slashing', 'piercing',
      'acid', 'cold', 'electricity', 'fire', 'sonic',
      'force', 'negative', 'positive', 'other'
    );
    `);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
    ALTER TABLE Damages MODIFY damage_type enum(
      'bludgeoning', 'slashing', 'piercing',
      'acid', 'cold', 'electricity', 'fire', 'sonic',
      'force', 'negative', 'positive'
    );
    `);
  }
};
