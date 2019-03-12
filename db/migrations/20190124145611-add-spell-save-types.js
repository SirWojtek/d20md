'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
    ALTER TABLE Spells MODIFY save_type enum(
     'none', 'reflex', 'fortitude', 'will', 'custom'
    );
    `);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
    ALTER TABLE Spells MODIFY save_type enum(
     'none', 'reflex', 'fortitude', 'will'
    );
    `);
  }
};
