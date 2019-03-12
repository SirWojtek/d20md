const {
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql');
const { userQueries } = require('./user-graphql');
const { userMutations } = require('./user-mutations-auth-graphql');

const query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    ...userQueries,
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

