const jwt = require('jsonwebtoken');
const express = require('express');
const userRouter = express.Router();
const common = require('./common');
const models = require('../db/models');
const email = require('./email');
const recaptcha = require('./recaptcha');

function verify(user) {
  return user.generateVerifyCode()
  .then(code => email.sendVerificationEmail(user.email, code));
}

userRouter.post('/login', function (req, res) {
  let user = req.body;

  models.User.findOne({
    where : {
      email : user.email
    }
  }, {
    attributes: {
      model: models.User,
      attributes: {
        exclude: [
          'createdAt', 'updatedAt', 'id', 'password', 'confirmed',
        ]
      },
  }
  }).then(function(foundUser) {
    if (!foundUser || !foundUser.verifyPassword(user.password) || !foundUser.isVerified()) {
      res.status(401);
      res.send('Invalid username or password');
    } else {
      user.usertype = foundUser.usertype;
      let token = jwt.sign(
        {
          id: foundUser.id,
          email: foundUser.email,
          usertype: foundUser.usertype
        },
        common.jwtOpts.secretOrKey, { expiresIn : '24h'}
      );
      res.json({ token : token });
  }});
});

userRouter.post('/create', function (req, res) {
  const recaptchaCode = req.body.recaptcha;
  let user = {
    email: req.body.email,
    password: String(req.body.password),
    usertype: 'user',
  }

  recaptcha.checkRecaptcha(recaptchaCode)
  .then(() => {
    return models.User.findOrCreate({
      where: { email: user.email },
      defaults: user,
    }).spread(function(newUser, created) {
      if (created || !newUser.isVerified()) {
        return verify(newUser)
          .then(() => res.end());
      }

      throw new Error('User already exists');
    })
  })
  .catch(err => common.errorHandler(err, res));
});

userRouter.get('/validate', (req, res) => {
  const code = req.query.code;

  models.User.findOne({ where: { verificationCode: code }})
  .then(user => {
    if (!user) { throw new Error('Cannot find that activation code'); }

    user.completeVerification();
    user.save().then(() => res.end());
  })
  .catch(err => common.errorHandler(err, res));
});

module.exports = userRouter;

