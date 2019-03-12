var express = require('express');
var validateRouter = express.Router();
var models = require('../db/models');

function validateWithAssociations(model, item) {
  let result = [ item.validate() ];

  for (let key in item) {
    if (model.associations[key] && item[key] && item[key]['validate']) {
      result.push(item[key].validate());
    }
  }

  return result;
}

function getIncludes(model) {
  let result = [];
  for (let key in model.associations) {
    result.push({ model: model.associations[key].target});
  }
  return result;
}

function mergeErrors(errors) {
  let result = [];

  errors.forEach(function(error) {
    if (error) {
      result.push(...error.errors);
    }
  });

  return result;
}

validateRouter.post('/:model', function (req, res) {
  let model = models[req.params.model];
  let item = model.build(req.body, {
    include: getIncludes(model)
  });

  Promise.all(validateWithAssociations(model, item))
  .then(function(errors) {
    res.json(mergeErrors(errors));
  });
});

module.exports = validateRouter;
