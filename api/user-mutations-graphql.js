const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
} = require('graphql');
const models = require('../db/models');
const { sendRecoveryEmail } = require('../backend/email');

module.exports = {
  userMutations: {
    resetPassword: {
      type: GraphQLBoolean,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (obj, args) => {
        return models.User.findOne({ where: { email: args.email } })
          .then(user => {
            if (!user) {
              throw new Error('User with given email does not exist');
            }

            return user.generateRecoveryCode()
              .then(code => sendRecoveryEmail(user.email, code));
          });
      },
    },
    changePassword: {
      type: GraphQLBoolean,
      args: {
        code: { type: new GraphQLNonNull(GraphQLString) },
        newPassword: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (obj, args) => {
        return models.User.findOne({ where: { recovery_code: args.code } })
          .then(user => {
            if (!user) {
              throw new Error('Recovery code does not exist');
            }

            user.recovery_code = null;
            user.password = args.newPassword;
            return user.save();
          });
      },
    },
  }
};
