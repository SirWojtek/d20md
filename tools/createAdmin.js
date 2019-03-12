#!/usr/bin/node

var models = require('../db/models');

if (process.argv.length != 4) {
  console.log('Usage: createAdmin.js <admin-account-name> <admin-account-password>');
  return -1;
}

models.User.create({
  email: process.argv[2],
  password: process.argv[3],
  usertype: 'admin',
  confirmed: true,
});

