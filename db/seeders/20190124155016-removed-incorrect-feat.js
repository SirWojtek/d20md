'use strict';

const models = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const query = {
      where: {
        name: 'Feat Name'
      }
    };

    return models.Feat.findOne(query)
    .then(feat => {
      if (!feat) {
        return;
      }

      return models.FeatTextPrerequisite.destroy({
        where: { featId: feat.id }
      })
      .then(() => feat.destroy());
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
