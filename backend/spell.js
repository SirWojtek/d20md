var express = require('express');
var spellRouter = express.Router();
var common = require('./common');
var models = require('../db/models');
var _ = require('lodash');

spellRouter.post('/update', function (req, res) {
  let spell = {
    description: req.body.description,
    save_type: req.body.save_type,
    permits_sr: req.body.permits_sr,
    spell_type: req.body.spell_type,
    spell_range: req.body.spell_range,
    range_info: req.body.range_info,
  };
  spell = _.omitBy(spell, _.isNil);

  const createSpellLevelsPromise = req.body.SpellLevels ?
      models.SpellLevel.bulkCreate(req.body.SpellLevels, { individualHooks: true }) :
      Promise.resolve(null)

  return Promise.all([
    models.Spell.findById(req.body.id, { include: [ models.SpellLevel ]}),
    createSpellLevelsPromise,
  ]).then(([old, levels]) => {
    if (!common.checkOwnership(old, req, res)) {
      throw Error('User not permited');
    }

    const setLevelPromise = levels ?
      old.setSpellLevels(levels).then(() => levels) :
      Promise.resolve(old.SpellLevels);

    return Promise.all([ old.update(spell), setLevelPromise ])
      .then(([updated, spellLevels]) => ({
        ...updated.toJSON(),
        SpellLevels: spellLevels && spellLevels.map(s => s.toJSON())
      }));
  })
  .then(updated => {
    res.json(updated);
    res.end();
  })
  .catch(err => common.errorHandler(err, res));
});

spellRouter.post('/add', function (req, res) {
  models.Spell.create({ name: req.body.name }, { include: [ models.SpellLevel ]})
  .then(function(newSpell) {
    return newSpell.setUser(req.user)
    .then(function () {
      res.json({ 'id' : newSpell.id });
      res.end();
    });
  })
  .catch(err => common.errorHandler(err, res));
});

spellRouter.post('/del', function (req, res) {
  models.Spell.findById(req.body.id)
  .then(function(old) {
    if (!common.checkOwnership(old, req, res)) {
      throw Error('User not permited');
    }

    old.destroy().then(() => res.end());
  })
  .catch(err => common.errorHandler(err, res));
});

module.exports = spellRouter;

