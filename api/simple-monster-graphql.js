const {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
} = require('graphql');

module.exports = {
  simpleMonster: new GraphQLObjectType({
    name: 'SimpleMonster',
    fields: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
      name: { type: GraphQLString  },
      // TODO: add Image
    }
  }),
};
