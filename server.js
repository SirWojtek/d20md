#!/usr/bin/env node

const bodyParser = require("body-parser");
const models = require("./db/models");
const path = require("path");
const cors = require("cors");
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { formatError } = require('graphql');
const app = express();
const env = require('./environment/environment');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors({ origin: env.host }))

const passport = require('./backend/passport');

const user = require('./backend/user');
const monster = require('./backend/monster');
const feat = require('./backend/feat');
const spell = require('./backend/spell');
const admin = require('./backend/admin');
const validate = require('./backend/validate.js');

const schema = require('./api/schema-graphql');
const schemaAuth = require('./api/schema-auth-graphql');

app.use('/api/graphql', graphqlHTTP({
  schema,
  graphiql: env.graphQLEditor,
  formatError: err => {
    console.error(err);
    return formatError(err);
  }
}));

app.use('/api/graphql-auth', passport, graphqlHTTP({
  schema: schemaAuth,
  formatError: err => {
    console.error(err);
    return formatError(err);
  }
}));

app.use('/api/user', user);
app.use('/api/admin', passport, admin);

app.use('/api/monsters', passport, monster);

app.use('/api/feat', passport, feat);

app.use('/api/spells', passport, spell);

app.use('/api/validate', validate);

// NOTE: error handler
app.use(function(err, req, res, next) {
  console.error(err.message);
  res.status(err.status || 500);
  res.json({
    message: err.message,
  });
});

models.sequelize.sync()
.then(function () {
  app.listen(env.port, function () {
    console.log('Server listening on port ' + env.port);
  });
});
