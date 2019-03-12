'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('SpellDescriptors', 'SpellId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Spells",
        key: "id"
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('SpellDescriptors', 'SpellId');
  }
};
