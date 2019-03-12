'use strict';

const fs = require('fs');
const models = require('../models');
const featJson = JSON.parse(fs.readFileSync('tools/jsonOut/feat.json', 'utf8'));

module.exports = {
  up: (queryInterface, Sequelize) => {
    return models.User.findOne({ where: { usertype: 'admin' }})
    .then(admin => {
      const data = featJson.featTemplates.map(template => {
        return {
          name: template.name,
          specialized_by: template.specialized_by,
          feat_type: template.feat_type,
          benefit: template.benefit,
          normal: template.normal,
          special: template.special,
          UserId: admin.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });

      return queryInterface.bulkInsert('FeatTemplates', data);
    });
  },

  down: (queryInterface, Sequelize) => {
    return models.User.findOne({ where: { usertype: 'admin' }})
    .then(admin => {
      return queryInterface.bulkDelete('FeatTemplates', { UserId: admin.id });
    });
  }
};
