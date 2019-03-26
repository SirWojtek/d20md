const { resolver } = require('graphql-sequelize');
const {
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');
const _ = require('lodash');
const models = require('../db/models');
const common = require('../backend/common');
const { monstersWithCount } = require('./monster-graphql');

module.exports = {
  monsterAuthQueries: {
    monsterFavourites: {
      type: monstersWithCount,
      args: {
        name: { type: GraphQLString, },
        type: { type: GraphQLString, },
        min_hd_sum: { type: GraphQLInt, },
        max_hd_sum: { type: GraphQLInt, },
        offset: { type: new GraphQLNonNull(GraphQLInt) },
        limit: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: resolver(models.Monster, {
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
              exact: ['type'],
              range: ['hd_sum']
            }),
            include: [
              {
                association: 'MonsterFavourites',
                where: { id: userId },
              },
            ]
          };

          // NOTE: context is shared between queries from the same request
          // The name of the property must be unique
          context.monsterFavouritesOptions = findOptions;
          return findOptions;
        },
        after: (monsters, _, context) => ({
          monsters,
          count: models.Monster.count(context.monsterFavouritesOptions)
        }),
      }),
    },
  }
};
