'use strict';

const fs = require('fs');
const _ = require('lodash');
const models = require('../models');
const featJson = JSON.parse(fs.readFileSync('tools/jsonOut/feat.json', 'utf8'));

function findFeat(feats, prereq) {
  return feats.find(feat => feat.name.toLowerCase() === prereq.toLowerCase());
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      models.FeatTemplate.findAll({ attributes: [ 'id', 'name' ] }),
      models.Feat.findAll({ attributes: [ 'id', 'name' ] })
    ]).then(records => {
      const templates = records[0];
      const feats = records[1];

      const featPrereq = _.flatMap(featJson['featTemplates'], template => {
        return template.prerequisite
          .filter(prereq => findFeat(feats, prereq))
          .map(featPrereq => {
            const featDb = findFeat(feats, featPrereq);
            const templateDb = findFeat(templates, template.name);

            return {
              FeatId: featDb.id,
              FeatTemplateId: templateDb.id,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
          });
      });

      return queryInterface.bulkInsert('FeatTemplateToFeatPrerequisiteInstances', featPrereq);
    });
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      models.User.findOne({ where: { usertype: 'admin' }}),
      models.Feat.findAll({ attributes: [ 'UserId', 'id' ]})
    ])
    .then(records => {
      const admin = records[0];
      const feats = records[1];

      const idsToDelete = feats
        .filter(m => m.UserId == admin.id)
        .map(m => m.id);

      return queryInterface.bulkDelete('FeatTemplateToFeatPrerequisiteInstances', { FeatId: idsToDelete });
    });
    return queryInterface.bulkDelete('FeatTemplateToFeatPrerequisiteInstances', null);
  }
};
