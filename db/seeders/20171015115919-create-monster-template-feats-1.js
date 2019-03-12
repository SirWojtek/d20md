'use strict';

const fs = require('fs');
const _ = require('lodash');
const models = require('../models');
const monsterJson = JSON.parse(fs.readFileSync('tools/jsonOut/monster.json', 'utf8'));

function findMonster(name) {
  return monsterJson.find(m => m.name === name);
}

function findTemplate(templates, t) {
  const template = templates.find(template =>
    t.toLowerCase().indexOf(template.name.toLowerCase()) !== -1);
  if (!template) { throw Error('Cannot find template for ' + t); }
  return template;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      models.Monster.findAll({ attributes: [ 'id', 'name' ] }),
      models.FeatTemplate.findAll(),
      models.User.findOne({ where: { usertype: 'admin' }})
    ]).then(records => {
      const monsters = records[0];
      const templates = records[1];
      const admin = records[2];

      let data = _.flatMap(monsters, monster => {
        const jsonMonster = findMonster(monster.name);
        if (!jsonMonster) {
          return null;
        }

        return jsonMonster.Feats.templates.map(template => {
          const dbTemplate = findTemplate(templates, template);

          return {
            name: template,
            feat_type: dbTemplate.feat_type,
            benefit: dbTemplate.benefit,
            normal: dbTemplate.normal,
            special: dbTemplate.special,
            UserId: admin.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        });
      })
      .filter(f => !!f);

      data = _.uniqBy(data, 'name');

      return queryInterface.bulkInsert('Feats', data);
    });
  },

  // NOTE: cannot simple determine created feats
  // NOTE: admin feats are deleted during create-feats undo seed
  down: (queryInterface, Sequelize) => {
    return null;
  }
};
;
