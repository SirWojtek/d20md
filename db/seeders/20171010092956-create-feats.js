'use strict';

const fs = require('fs');
const models = require('../models');
const featJson = JSON.parse(fs.readFileSync('tools/jsonOut/feat.json', 'utf8'));

module.exports = {
  up: (queryInterface, Sequelize) => {
    return models.User.findOne({ where: { usertype: 'admin' }})
    .then(admin => {
      const data = featJson.feats.map(feat => {
        return {
          name: feat.name,
          feat_type: feat.feat_type,
          benefit: feat.benefit,
          normal: feat.normal,
          special: feat.special,
          multiple: feat.multiple,
          stack: feat.stack,
          UserId: admin.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });

      return queryInterface.bulkInsert('Feats', data);
    });
  },

  down: (queryInterface, Sequelize) => {
    return models.User.findOne({ where: { usertype: 'admin' }})
    .then(admin => {
      return queryInterface.bulkDelete('Feats', { UserId: admin.id });
    });
  }
};
