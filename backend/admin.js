var express = require('express');
var adminRouter = express.Router();
var models = require('../db/models');
var _ = require('lodash');

function checkPermision (req, res) {
  if (req.user.usertype != 'admin') {
    res.status(401);
    res.send('Unauthorized');
    return false;
  }

  return true;
}

adminRouter.get('/users/showNotAccepted', function (req, res) {
  if (!checkPermision(req, res)) { return; }

  models.User.findAll({
    where: { confirmed: false },
    attributes: {
      exclude: [ 'password' ],
    },
  }).then(function(users) {
    return res.json(users);
  });
});

adminRouter.post('/users/accept/:id', function (req, res) {
  if (!checkPermision(req, res)) { return; }

  models.User.findById(req.params.id)
  .then(function (user) {
    user.update({
      confirmed: true
    }).then(function () { res.end(); });
  });
});

adminRouter.post('/users/delete/:id', function (req, res) {
  if (!checkPermision(req, res)) { return; }

  models.User.findById(req.params.id)
  .then(function (user) {
    user.destroy()
    .then(function () { res.end(); });
  });
});

module.exports = adminRouter;
