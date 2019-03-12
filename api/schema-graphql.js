const {
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql');
const { monsterQueries } = require('./monster-graphql');
const { featQueries } = require('./feat-graphql');
const { spellQueries } = require('./spell-graphql');
const { enumQueries } = require('./enum-graphql');

const { userMutations } = require('./user-mutations-graphql');

const query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    ...monsterQueries,
    ...featQueries,
    ...spellQueries,
    ...enumQueries,
  }
});

const mutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    ...userMutations,
  },
});

module.exports = new GraphQLSchema({
  query,
  mutation,
});

