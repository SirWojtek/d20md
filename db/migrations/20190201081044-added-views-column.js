'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    const columnOptions = {
      type: Sequelize.BIGINT,
      defaultValue: 0,
    };

    return Promise.all([
      queryInterface.addColumn('Monsters', 'views', columnOptions),
      queryInterface.addColumn('Spells', 'views', columnOptions),
      queryInterface.addColumn('Feats', 'views', columnOptions),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Monsters', 'views'),
      queryInterface.removeColumn('Spells', 'views'),
      queryInterface.removeColumn('Feats', 'views'),
    ]);
  }
};
