const ExtractJwt = require('passport-jwt').ExtractJwt;
const models = require('../db/models');
const _ = require('lodash');

module.exports = {
  jwtOpts : {
    jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey : process.env.JWT_SECRET || 'dev-secret'
  },
  checkOwnership : function  (model, req, res) {
    if (!model) { return false; }
    if (!model.User) { return true; }
    if (req.user.usertype == 'admin' || model.User.id == req.user.id) { return true; }

    res.status(401);
    res.send('Unauthorized');
    return false;
  },
  buildFindQuery: function (args, fields = { like: [], exact: [], range: [], tag: null }, fieldMap = {}) {
    const query = {};

    if (fields.like) {
      for (let field of fields.like) {
        if (!args[field]) { continue; }
        const fieldName = fieldMap[field] || field;
        query[fieldName] = { $like: '%' + args[field] + '%' };
      }
    }

    if (fields.exact) {
      for (let field of fields.exact) {
        if (!args[field]) { continue; }
        const fieldName = fieldMap[field] || field;
        query[fieldName] = args[field];
      }
    }

    if (fields.range) {
      for (let field of fields.range) {
        if (!args['min_' + field] || !args['max_' + field]) { continue; }
        const fieldName = fieldMap[field] || field;
        query[fieldName] = {
          $between: [ args['min_' + field], args['max_' + field] ]
        };
      }
    }

    if (fields.tag && args[fields.tag] && args[fields.tag].length) {
      query['type'] = { $in: args[fields.tag] };
    }

    return _.isEmpty(query) ? null : query;
  },
  generateOrderList: function (desc, asc, model) {
    let result = [];
    if (Array.isArray(desc)) {
      result.push(...desc.map(field => model ?
        [ model, field, 'DESC' ] : [ field, 'DESC' ]
      ));
    }
    if (Array.isArray(asc)) {
      result.push(...asc.map(field => model ?
        [ model, field, 'asc' ] : [ field, 'asc' ]
      ));
    }
    return result;
  },
  errorHandler: function(err, res) {
    console.error(err);

    res.status(400);
    if (err.errors) {
      res.send(err.errors);
    } else {
      res.send([ { message: err.message } ]);
    }
    res.end();
  },
  reportView: function(model) {
    model.views += 1;
    // NOTE: do not update updatedAt field
    return model.save({ silent: true });
  },
  addToMonsterLog: function(monster, userId) {
    if (!userId) {
      return Promise.resolve();
    }
    return models.User.findById(userId)
      .then(user => user.addMonsterViewLog(
        monster,
        { through: { updatedAt: new Date() }}
      ));
  },
  addToSpellLog: function(spell, userId) {
    if (!userId) {
      return Promise.resolve();
    }
    return models.User.findById(userId)
      .then(user => user.addSpellViewLog(
        spell,
        { through: { updatedAt: new Date() }}
      ));
  },
  addToFeatLog: function(feat, userId) {
    if (!userId) {
      return Promise.resolve();
    }
    return models.User.findById(userId)
      .then(user => user.addFeatViewLog(
        feat,
        { through: { updatedAt: new Date() }}
      ));
  },
};

