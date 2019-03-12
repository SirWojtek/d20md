const {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLNonNull,
} = require('graphql');

const simpleUserType = new GraphQLObjectType({
  name: 'SimpleUser',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  }
});

module.exports = {
  simpleUserType,
};
