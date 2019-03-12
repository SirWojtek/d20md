'use strict';

const fs = require('fs');
const _ = require('lodash');
const models = require('../models');
const monsterJson = JSON.parse(fs.readFileSync('tools/jsonOut/monster.json', 'utf8'));

function findMonster(name) {
  return monsterJson.find(m => m.name === name);
}

function findFeatId(dbFeats, f) {
  const feat = dbFeats.find(feat => feat.name.toLowerCase() === f.toLowerCase());
  if (!feat) { throw Error('Cannot find feat ' + f); }
  return feat.id;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      models.Monster.findAll({ attributes: [ 'id', 'name' ] }),
      models.Feat.findAll({ attribtues: [ 'id', 'name' ] })
    ]).then(records => {
      const monsters = records[0];
      const feats = records[1];

      const data = _.flatMap(monsters, monster => {
        const jsonMonster = findMonster(monster.name);
        if (!jsonMonster) {
          return null;
        }

        return jsonMonster.Feats.templates.map(template => {
          return {
            MonsterId: monster.id,
            FeatId: findFeatId(feats, template),
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        });
      })
      .filter(f => !!f);

      return queryInterface.bulkInsert('MonsterFeatInstances', data);
    });
  },

  // NOTE: cannot simple determine created feats
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      models.User.findOne({ where: { usertype: 'admin' }}),
      models.Monster.findAll({ attributes: [ 'UserId', 'id' ]})
    ])
    .then(records => {
      const admin = records[0];
      const monsters = records[1];

      const idsToDelete = monsters
        .filter(m => m.UserId == admin.id)
        .map(m => m.id);

      return queryInterface.bulkDelete('MonsterFeatInstances', { MonsterId: idsToDelete });
    });
  }
};
;
