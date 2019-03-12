'use strict';

const fs = require('fs');
const models = require('../models');
const monsterJson = JSON.parse(fs.readFileSync('tools/jsonOut/monster.json', 'utf8'));

function getHdSum(hitDices) {
  return hitDices.reduce(
    (res, dice) => res += dice.hd_amount,
    0);
}

function getAttackMax(attackGroups) {
  let max = 0;
  for (let attackGroup of attackGroups) {
    for (let attack of attackGroup.Attacks) {
      if (max < attack.attack_bonus) { max = attack.attack_bonus; }
    }
  }
  return max;
}

function getArmorSum(armor) {
  let sum = 10;
  for (let type in armor) {
    sum += armor[type];
  }
  return sum;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return models.User.findOne({ where: { usertype: 'admin' }})
    .then(admin => {
      const data = monsterJson.map(monster => {
        return {
          name: monster.name,
          type: monster.type,
          size: monster.size,
          hd_sum: getHdSum(monster.HitDices),
          armor_sum: getArmorSum(monster.Armor),
          attack_max: getAttackMax(monster.AttackGroups),
          base_attack: monster.base_attack,
          grapple: monster.grapple,
          description: monster.description,
          hp: monster.hp,
          initiative: monster.initiative,
          challenge_rating: monster.challenge_rating,
          organisation: monster.organisation,
          treasure: monster.treasure,
          UserId: admin.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });

      return queryInterface.bulkInsert('Monsters', data);
    });
  },

  down: (queryInterface, Sequelize) => {
    return models.User.findOne({ where: { usertype: 'admin' }})
    .then(admin => {
      return queryInterface.bulkDelete('Monsters', { UserId: admin.id });
    });
  }
};
