const { resolver } = require('graphql-sequelize');
const {
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');
const _ = require('lodash');
const models = require('../db/models');
const common = require('../backend/common');
const { featsWithCount } = require('./feat-graphql');

module.exports = {
  featAuthQueries: {
    featFavourites: {
      type: featsWithCount,
      args: {
        name: { type: GraphQLString, },
        feat_type: { type: GraphQLString, },
        offset: { type: new GraphQLNonNull(GraphQLInt) },
        limit: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: resolver(models.Feat, {
        list: true,
        before: (findOptions, args, context) => {
          const userId = _.get(context, 'user.id');
          if (!userId) {
            throw Error('Cannot determine userId');
          }

          findOptions = {
            ...findOptions,
            distinct: true,
            order: common.generateOrderList(['name'], []),
            where: common.buildFindQuery(args, {
              like: ['name'],
              exact: ['feat_type'],
            }),
            include: [
              {
                association: 'FeatFavourites',
                where: { id: userId },
              },
            ]
          };

          // NOTE: context is shared between queries from the same request
          // The name of the property must be unique
          context.featFavouritesOptions = findOptions;
          return findOptions;
        },
        after: (feats, _, context) => ({
          feats,
          count: models.Feat.count(context.featFavouritesOptions)
        }),
      }),
    },
  }
};
