'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
    ALTER TABLE Spells MODIFY spell_type enum(
      'abjuration','conjuration','divination','enchantment','evocation','illusion','necromancy','transmutation', 'universal'
    );
    `);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
    ALTER TABLE Spells MODIFY spell_type enum(
      'abjuration','conjuration','divination','enchantment','evocation','illusion','necromancy','transmitation'
    );
    `);
  }
};
