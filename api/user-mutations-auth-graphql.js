const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
} = require('graphql');
const _ = require('lodash');
const models = require('../db/models');

module.exports = {
  userMutations: {
    changePassword: {
      type: GraphQLBoolean,
      args: {
        newPassword: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (obj, args, context) => {
        const userId = _.get(context, 'user.id');
        if (!userId) {
          throw Error('Cannot determine userId');
        }

        return models.User.findById(userId)
          .then(user => {
            if (!user) {
              throw new Error('User does not exists');
            }

            user.password = args.newPassword;
            return user.save();
          });
      },
    },
  }
};
