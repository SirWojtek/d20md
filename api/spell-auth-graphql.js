const { resolver } = require('graphql-sequelize');
const {
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');
const _ = require('lodash');
const models = require('../db/models');
const common = require('../backend/common');
const { spellsWithCount } = require('./spell-graphql');

module.exports = {
  spellAuthQueries: {
    spellFavourites: {
      type: spellsWithCount,
      args: {
        name: { type: GraphQLString, },
        spell_type: { type: GraphQLString, },
        offset: { type: new GraphQLNonNull(GraphQLInt) },
        limit: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: resolver(models.Spell, {
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
              exact: ['spell_type'],
            }),
            include: [
              {
                association: 'SpellFavourites',
                where: { id: userId },
              },
            ]
          };

          // NOTE: context is shared between queries from the same request
          // The name of the property must be unique
          context.spellFavouritesOptions = findOptions;
          return findOptions;
        },
        after: (spells, _, context) => ({
          spells,
          count: models.Spell.count(context.spellFavouritesOptions)
        }),
      }),
    },
  }
};
