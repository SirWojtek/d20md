"use strict";

const bcrypt = require("bcrypt-nodejs");
const uuidv4 = require('uuid/v4');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(128),
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Email cannot be empty",
        },
        isEmail: {
          msg: "Invalid email format"
        },
        len: {
          args: [5, 100],
          msg: 'email should be between 5 and 100 characters',
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password cannot be empty",
        },
      }
    },
    usertype: {
      type: DataTypes.ENUM,
      values: [ 'user', 'admin' ],
      defaultValue: 'user',
    },
    verificationCode: {
      type: DataTypes.STRING,
    },
    recovery_code: {
      type: DataTypes.STRING,
    },
  }, {
    hooks: {
      beforeCreate: function(user, opts) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
      },
      beforeBulkCreate: function(users, opts) {
        users.forEach(user => {
          user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
        });
      },
      beforeUpdate: function(user, opts) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
      },
    },
  });

  User.associate = function(models) {
    User.belongsToMany(models.Monster, { as: 'MonsterViewLogs', through: 'MonsterViewLog' });
    User.belongsToMany(models.Spell, { as: 'SpellViewLogs', through: 'SpellViewLog' });
    User.belongsToMany(models.Feat, { as: 'FeatViewLogs', through: 'FeatViewLog' });
  };

  User.prototype.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.prototype.generateVerifyCode = function() {
    this.verificationCode = uuidv4();
    return this.save().then(u => u.verificationCode);
  }

  User.prototype.completeVerification = function() {
    this.verificationCode = null;
  }

  User.prototype.isVerified = function() {
    return this.verificationCode === null;
  }

  User.prototype.generateRecoveryCode = function() {
    this.recovery_code = uuidv4();
    return this.save().then(u => u.recovery_code);
  }

  return User;
};
