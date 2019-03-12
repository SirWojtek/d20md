'use strict';

const fs = require('fs');
const models = require('../models');
const monsterJson = JSON.parse(fs.readFileSync('tools/jsonOut/monster.json', 'utf8'));

function findMonster(name) {
  return monsterJson.find(m => m.name === name);
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return models.Monster.findAll({
      attributes: [ 'id', 'name' ]
    }).then(monsters => {
      const data = monsters.map(monster => {
        const jsonMonster = findMonster(monster.name);
        if (!jsonMonster) {
          return null;
        }

        return {
          appraise: jsonMonster.Skill.appraise || 0,
          balance: jsonMonster.Skill.balance || 0,
          bluff: jsonMonster.Skill.bluff || 0,
          climb: jsonMonster.Skill.climb || 0,
          concentration: jsonMonster.Skill.concentration || 0,
          craft_alchemy: jsonMonster.Skill.craft_alchemy || 0,
          craft_armor: jsonMonster.Skill.craft_armor || 0,
          craft_bow: jsonMonster.Skill.craft_bow || 0,
          craft_weapon: jsonMonster.Skill.craft_weapon || 0,
          craft_trap: jsonMonster.Skill.craft_trap || 0,
          craft_varies: jsonMonster.Skill.craft_varies || 0,
          decipher_script: jsonMonster.Skill.decipher_script || 0,
          diplomacy: jsonMonster.Skill.diplomacy || 0,
          disable_device: jsonMonster.Skill.disable_device || 0,
          disguise: jsonMonster.Skill.disguise || 0,
          escape_artist: jsonMonster.Skill.escape_artist || 0,
          forgery: jsonMonster.Skill.forgery || 0,
          gather_information: jsonMonster.Skill.gather_information || 0,
          handle_animal: jsonMonster.Skill.handle_animal || 0,
          heal: jsonMonster.Skill.heal || 0,
          hide: jsonMonster.Skill.hide || 0,
          intimidate: jsonMonster.Skill.intimidate || 0,
          jump: jsonMonster.Skill.jump || 0,
          knowledge_arcana: jsonMonster.Skill.knowledge_arcana || 0,
          knowledge_architecture: jsonMonster.Skill.knowledge_architecture || 0,
          knowledge_dungeon: jsonMonster.Skill.knowledge_dungeon || 0,
          knowledge_geography: jsonMonster.Skill.knowledge_geography || 0,
          knowledge_history: jsonMonster.Skill.knowledge_history || 0,
          knowledge_local: jsonMonster.Skill.knowledge_local || 0,
          knowledge_nature: jsonMonster.Skill.knowledge_nature || 0,
          knowledge_nobility: jsonMonster.Skill.knowledge_nobility || 0,
          knowledge_religion: jsonMonster.Skill.knowledge_religion || 0,
          knowledge_planes: jsonMonster.Skill.knowledge_planes || 0,
          listen: jsonMonster.Skill.listen || 0,
          move_silently: jsonMonster.Skill.move_silently || 0,
          open_lock: jsonMonster.Skill.open_lock || 0,
          perform: jsonMonster.Skill.perform || 0,
          psicraft: jsonMonster.Skill.psicraft || 0,
          profession: jsonMonster.Skill.profession || 0,
          ride: jsonMonster.Skill.ride || 0,
          search: jsonMonster.Skill.search || 0,
          sense_motive: jsonMonster.Skill.sense_motive || 0,
          sleight_of_hand: jsonMonster.Skill.sleight_of_hand || 0,
          spellcraft: jsonMonster.Skill.spellcraft || 0,
          spot: jsonMonster.Skill.spot || 0,
          survival: jsonMonster.Skill.survival || 0,
          swim: jsonMonster.Skill.swim || 0,
          tumble: jsonMonster.Skill.tumble || 0,
          use_magic_device: jsonMonster.Skill.use_magic_device || 0,
          use_rope: jsonMonster.Skill.use_rope || 0,
          MonsterId: monster.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      })
      .filter(m => !!m);

      return queryInterface.bulkInsert('Skills', data);
    });
  },

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

      return queryInterface.bulkDelete('Skills', { MonsterId: idsToDelete });
    });
  }
}
