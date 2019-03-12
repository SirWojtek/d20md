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
    return models.FeatTemplate.findAll({ attributes: [ 'id', 'name' ] })
      .then(templates => {
      const featPrereq = _.flatMap(featJson['featTemplates'], template => {
        return template.prerequisite
          .filter(prereq => findFeat(templates, prereq))
          .map(templatePrereq => {
            const templatePrereqDb = findFeat(templates, templatePrereq);
            const templateDb = findFeat(templates, template.name);

            return {
              FeatTemplateId: templateDb.id,
              FeatTemplatePrerequisiteId: templatePrereqDb.id,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
          });
      });

      return queryInterface.bulkInsert('FeatTemplateToFeatTemplatePrerequisiteInstances', featPrereq);
    });
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      models.User.findOne({ where: { usertype: 'admin' }}),
      models.FeatTemplate.findAll({ attributes: [ 'UserId', 'id' ]})
    ])
    .then(records => {
      const admin = records[0];
      const featTemplates = records[1];

      const idsToDelete = featTemplates
        .filter(m => m.UserId == admin.id)
        .map(m => m.id);

      return queryInterface.bulkDelete('FeatTemplateToFeatTemplatePrerequisiteInstances', { FeatTemplateId: idsToDelete });
    });
    return queryInterface.bulkDelete('FeatTemplateToFeatTemplatePrerequisiteInstances', null);
  }
};
