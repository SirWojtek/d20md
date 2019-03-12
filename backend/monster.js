const express = require('express');
const _ = require('lodash');
const fs = require('fs');
const multer = require('multer');
const monsterRouter = express.Router();

const common = require('./common');
const models = require('../db/models');
const image = require('./image');

const upload = multer({
  dest: './uploads',
  limits: { fileSize: 1000 * 1000 }
});

const attackGroupIncludes = [
  { model: models.Attack, include: [ models.Damage ] }
];

const monsterIncludes = [
  { model: models.Attribute },
  { model: models.Skill },
  { model: models.HitDice },
  { model: models.Armor },
  { model: models.Save },
  { model: models.Speed },
  { model: models.AttackGroup, include: attackGroupIncludes },
  { model: models.Spell },
  { model: models.Special },
  { model: models.Feat },
  { model: models.Image },
];

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

function findInModel(attrs, model) {
  return attrs ?
    model.findAll({ where: { id: attrs.map(attr => attr.id) }}) :
    Promise.resolve(null);
}

function createAttackGroups(attackGroups) {
  return attackGroups ? Promise.all(
    attackGroups.map(attackGroup => models.AttackGroup.create(
      attackGroup,
      { include: attackGroupIncludes }
    ))
  ) : null;
}

function updateMonsterAssociations(toUpdate, data) {
  return Promise.all([
    findInModel(data.Spells, models.Spell),
    findInModel(data.Feats, models.Feat),
    createAttackGroups(data.AttackGroups),
    data.HitDices ? models.HitDice.bulkCreate(data.HitDices) : Promise.resolve(null),
    data.Specials ? models.Special.bulkCreate(data.Specials) : Promise.resolve(null),
  ]).then(([Spells, Feats, AttackGroups, HitDices, Specials]) => Promise.all([
      Spells && toUpdate.setSpells(Spells),
      Feats && toUpdate.setFeats(Feats),
      AttackGroups && toUpdate.setAttackGroups(AttackGroups),
      HitDices && toUpdate.setHitDices(HitDices),
      Specials && toUpdate.setSpecials(Specials),
      data.Attribute && toUpdate.Attribute.updateAttributes(data.Attribute),
      data.Skill && toUpdate.Skill.updateAttributes(data.Skill),
      data.Armor && toUpdate.Armor.updateAttributes(data.Armor),
      data.Save && toUpdate.Save.updateAttributes(data.Save),
      data.Speed && toUpdate.Speed.updateAttributes(data.Speed),
    ]).then(() => ({
      Spells: Spells && Spells.map(s => s.toJSON()),
      Feats: Feats && Feats.map(f => f.toJSON()),
      AttackGroups: AttackGroups && AttackGroups.map(g => g.toJSON()),
      HitDices: HitDices && HitDices.map(h => h.toJSON()),
      Specials: Specials && Specials.map(s => s.toJSON()),
      ...data
    }))
  );
}

function createMonsterAssociations(toCreate) {
  return Promise.all([
    models.Skill.create(),
    models.Armor.create(),
    models.Image.create(),
    models.Speed.create(),
  ]).then(function(records) {
    return Promise.all([
      toCreate.setSkill(records[0]),
      toCreate.setArmor(records[1]),
      toCreate.setImage(records[2]),
      toCreate.setSpeed(records[3]),
    ]);
  });
}

function handleImageRemoval(oldImage) {
  if (!oldImage) {
    return Promise.resolve();
  }
  return image.remove(oldImage.path);
}

monsterRouter.post('/update', function (req, res) {
  let monster = {
    hdSum: req.body.HitDices && getHdSum(req.body.HitDices),
    armorSum: req.body.Armor && getArmorSum(req.body.Armor),
    attackMax: req.body.AttackGroups && getAttackMax(req.body.AttackGroups),
    description: req.body.description,
    hp: req.body.hp,
    initiative: req.body.initiative,
    type: req.body.type,
  };

  models.Monster.findById(
    req.body.id,
    { include: monsterIncludes }
  ).then(toUpdate => {
    if (!common.checkOwnership(toUpdate, req, res)) {
      throw Error('User not permited');
    }

    return updateMonsterAssociations(toUpdate, req.body)
    .then(monsterWithAssociations =>
      toUpdate.update(monster).then(updated => ({
        ...updated.toJSON(),
        ...monsterWithAssociations,
      }))
    );
  })
  .then(updated => {
    res.json(updated);
    res.end();
  })
  .catch(err => common.errorHandler(err, res));
});

monsterRouter.post('/addImage', upload.single('file'), function (req, res, next) {
  if (!req.query.id) { res.status(400); res.end(); return; }

  const MonsterId = +req.query.id;

  models.Image.findOne({ where: { MonsterId: MonsterId }})
    .then(oldImage =>
      handleImageRemoval(oldImage.path)
      .then(() => image.upload(req.file)
        .then(path =>
          models.Image.create({ path, MonsterId })
          .then(function(image) {
            oldImage.destroy();
            res.json(image);
            res.end();
          })
        )
      )
    )
  .catch(err => common.errorHandler(err, res));
});

monsterRouter.post('/add', function (req, res) {
  let newMonster = _.pick(req.body, [ 'name', 'hp', 'type', 'Save', 'Attribute', 'HitDices' ]);
  if (!newMonster.name) {
    throw new Error('Please provide a name of the monster');j
  }
  if (!newMonster.Save) {
    newMonster.Save = models.Save.getDefaultInstance();
  }
  if (!newMonster.Attribute) {
    newMonster.Attribute = models.Attribute.getDefaultInstance();
  }
  if (_.isEmpty(newMonster.HitDices)) {
    newMonster.HitDices = [ models.HitDice.getDefaultInstance() ];
  }

  models.Monster.create(newMonster, { include: monsterIncludes })
  .then(function (temp) {
    return Promise.all([
      createMonsterAssociations(temp),
      temp.setUser(req.user),
    ]).then(function (records) {
      res.json({ id : temp.id });
      res.end();
    });
  })
  .catch(err => common.errorHandler(err, res));
});

monsterRouter.post('/del', function (req, res) {
  let monster = req.body;

  models.Monster.findById(monster.id, {
    include: [
      { model: models.User },
    ],
  }).then(function(old) {
    if (!common.checkOwnership(old, req, res)) {
      throw Error('User not permited');
    }

    old.destroy().then(() => res.end());
  })
  .catch(err => common.errorHandler(err, res));
});

module.exports = monsterRouter;

