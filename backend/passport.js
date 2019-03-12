var passport = require('passport');
var models = require('../db/models');
var common = require('./common');
var JwtStrategy = require('passport-jwt').Strategy;

passport.use(new JwtStrategy(common.jwtOpts, function(jwtPayload, done) {
  models.User.findOne({
    where : {
      email : jwtPayload.email
  }}).then(function(user) {
    done(null, user);
  });
}));

module.exports = passport.authenticate('jwt', { session: false});

