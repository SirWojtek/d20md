'use strict';

const fs = require('fs');
const models = require('../models');
const featJson = JSON.parse(fs.readFileSync('tools/jsonOut/feat.json', 'utf8'))['feats'];

function findFeat(name) {
  return featJson.find(f => f.name.toLowerCase() === name.toLowerCase());
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    const query = {
      where: {
        feat_type: ''
      }
    };

    return models.Feat.findAll(query)
      .then(feats => {
        const updatedFeats = feats.map(feat => {
          const fromJson = findFeat(feat.name);
          if (!fromJson) {
            return null;
          }

          const types = fromJson.feat_type.split(',');
          feat.feat_type = types[0];
          return feat.save();
        })
        .filter(f => !!f);
        return Promise.all(updatedFeats);
      });
  },

  down: (queryInterface, Sequelize) => {
    // NOTE: no way to rollback this
  }
};

