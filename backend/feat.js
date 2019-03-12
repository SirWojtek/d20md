const express = require('express');
const _ = require('lodash');
const featRouter = express.Router();
const common = require('./common');
const models = require('../db/models');

function checkPrerequisiteUpdate(feat) {
  if (!feat.Prerequisite) { return; }
  if (feat.Prerequisite.some(pr => pr.id === feat.id)) {
    throw new Error('Cannot set prerequisite to self');
  }
}

function getPrerequisite(feat) {
  if (!feat.Prerequisite) { return Promise.resolve(null); }

  return Promise.all(
    feat.Prerequisite.map(p => models.Feat.findById(p.id))
  );
};

featRouter.post('/update', function (req, res) {
  let feat = {
    feat_type: req.body.feat_type,
    benefit: req.body.benefit,
    normal: req.body.normal,
    special: req.body.special,
    multiple: req.body.multiple,
    stack: req.body.stack,
  };
  feat = _.omitBy(feat, _.isNil);

  checkPrerequisiteUpdate(req.body);

  return Promise.all([
    models.Feat.findById(req.body.id, {
      include: [
        { model: models.Feat, as: 'Prerequisite' }
      ],
    }),
    getPrerequisite(req.body)
  ]).then(function([old, updatedPrereq]) {
    if (!common.checkOwnership(old, req, res)) {
      throw Error('User not permited');
    }

    const setPrereqPromise = updatedPrereq ?
      old.setPrerequisite(updatedPrereq).then(() => updatedPrereq) :
      Promise.resolve(old.Prerequisite);

    return Promise.all([ old.update(feat), setPrereqPromise ])
    .then(([updated, prereq]) => ({
      ...updated.toJSON(),
      Prerequisite: prereq.map(p => p.toJSON())
    }));
  })
  .then(updated => {
    res.json(updated);
    res.end();
  })
  .catch(err => common.errorHandler(err, res));
});

featRouter.post('/add', function (req, res) {
  models.Feat.create({ name: req.body.name })
  .then(function(feat) {
    return feat.setUser(req.user)
      .then(function () {
        res.json({ 'id' : feat.id });
        res.end();
      });
  })
  .catch(err => common.errorHandler(err, res));
});

featRouter.post('/del', function (req, res) {
  let feat = req.body;

  models.Feat.findById(feat.id)
  .then(function(old) {
    if (!common.checkOwnership(old, req, res)) {
      throw Error('User not permited');
    }

    old.destroy().then(() => res.end());
  })
  .catch(err => common.errorHandler(err, res));
});

module.exports = featRouter;

