const {
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql');
const { userQueries } = require('./user-graphql');
const { monsterAuthQueries } = require('./monster-auth-graphql');
const { spellAuthQueries } = require('./spell-auth-graphql');
const { featAuthQueries } = require('./feat-auth-graphql');
const { userMutations } = require('./user-mutations-auth-graphql');

const query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    ...userQueries,
    ...monsterAuthQueries,
    ...spellAuthQueries,
    ...featAuthQueries,
  }
});

const mutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    ...userMutations,
  }
});

module.exports = new GraphQLSchema({
  query,
  mutation,
});

