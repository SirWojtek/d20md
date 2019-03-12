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
    return models.Feat.findAll({ attributes: [ 'id', 'name' ] })
    .then(feats => {
      const featPrereq = _.flatMap(featJson['feats'], feat => {
        return feat.prerequisite
          .filter(prereq => findFeat(feats, prereq))
          .map(featPrereq => {
            const prereqDb = findFeat(feats, featPrereq);
            const featDb = findFeat(feats, feat.name);

            return {
              FeatId: featDb.id,
              PrerequisiteId: prereqDb.id,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
          });
      });

      return queryInterface.bulkInsert('FeatPrerequisiteInstances', featPrereq);
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

      return queryInterface.bulkDelete('FeatPrerequisiteInstances', { FeatId: idsToDelete });
    });
    return queryInterface.bulkDelete('FeatPrerequisiteInstances', null);
  }
};
