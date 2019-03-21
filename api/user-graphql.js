const { attributeFields, resolver } = require('graphql-sequelize');
const {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList
} = require('graphql');
const _ = require('lodash');
const { monsterType } = require('./monster-graphql');
const { spellType } = require('./spell-graphql');
const { featType } = require('./feat-graphql');
const models = require('../db/models');

// NOTE: this object is filled in graphql-sequelize with enum types
// to avoid typename duplication
const userEnumCache = {};

const viewLogType = new GraphQLObjectType({
  name: 'ViewLogType',
  fields: {
    updatedAt: { type: GraphQLString }
  }
});

const monsterLogType = new GraphQLObjectType({
  name: 'MonsterLogType',
  fields: {
    ...attributeFields(models.Monster, { cache: userEnumCache }),
    MonsterViewLog: { type: viewLogType },
  }
});
const spellLogType = new GraphQLObjectType({
  name: 'SpellLogType',
  fields: {
    ...attributeFields(models.Spell, { cache: userEnumCache }),
    SpellViewLog: { type: viewLogType },
  }
});
const featLogType = new GraphQLObjectType({
  name: 'FeatLogType',
  fields: {
    ...attributeFields(models.Feat, { cache: userEnumCache }),
    FeatViewLog: { type: viewLogType },
  }
});

const userHistoryType = new GraphQLObjectType({
  name: 'UserHistory',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    MonsterViewLogs: {
      type: new GraphQLList(monsterLogType),
      resolve: resolver(models.User.associations.MonsterViewLogs)
    },
    SpellViewLogs: {
      type: new GraphQLList(spellLogType),
      resolve: resolver(models.User.associations.SpellViewLogs)
    },
    FeatViewLogs: {
      type: new GraphQLList(featLogType),
      resolve: resolver(models.User.associations.FeatViewLogs)
    },
  }
});

const monsterFavouriteType = new GraphQLObjectType({
  name: 'MonsterFavouriteType',
  fields: attributeFields(models.Monster, { cache: userEnumCache }),
});
const spellFavouriteType = new GraphQLObjectType({
  name: 'SpellFavouriteType',
  fields: attributeFields(models.Spell, { cache: userEnumCache }),
});
const featFavouriteType = new GraphQLObjectType({
  name: 'FeatFavouriteType',
  fields: attributeFields(models.Feat, { cache: userEnumCache }),
});

const userFavouriteType = new GraphQLObjectType({
  name: 'UserFavourite',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    MonsterFavourites: {
      type: new GraphQLList(monsterFavouriteType),
      resolve: resolver(models.User.associations.MonsterFavourites),
    },
    SpellFavourites: {
      type: new GraphQLList(spellFavouriteType),
      resolve: resolver(models.User.associations.SpellFavourites),
    },
    FeatFavourites: {
      type: new GraphQLList(featFavouriteType),
      resolve: resolver(models.User.associations.FeatFavourites),
    },
  }
});

module.exports = {
  userHistoryType,
  userFavouriteType,
  userQueries: {
    userHistory: {
      type: userHistoryType,
      resolve: resolver(models.User, {
        before: (findOptions, args, context) => {
          const userId = _.get(context, 'user.id');
          if (!userId) {
            throw Error('Cannot determine userId');
          }

          findOptions = {
            ...findOptions,
            where: { id: userId },
            order: [
              [ models.sequelize.literal('`MonsterViewLogs->MonsterViewLog`.`updatedAt`'), 'DESC' ],
              [ models.sequelize.literal('`SpellViewLogs->SpellViewLog`.`updatedAt`'), 'DESC' ],
              [ models.sequelize.literal('`FeatViewLogs->FeatViewLog`.`updatedAt`'), 'DESC' ],
            ],
            include: [
              {
                association: models.User.associations.MonsterViewLogs,
              },
              {
                association: models.User.associations.SpellViewLogs,
              },
              {
                association: models.User.associations.FeatViewLogs,
              },
            ]
          };

          return findOptions;
        },
        after: (user, args, context) => {
          if (!user) {
            return;
          }

          // NOTE: poor solution because there is no support for offset/limit for n:m relations:
          // https://github.com/sequelize/sequelize/issues/4376
          if (user.MonsterViewLogs) {
            user.MonsterViewLogs = user.MonsterViewLogs.slice(0, 10);
          }
          if (user.SpellViewLogs) {
            user.SpellViewLogs = user.SpellViewLogs.slice(0, 10);
          }
          if (user.FeatViewLogs) {
            user.FeatViewLogs = user.FeatViewLogs.slice(0, 10);
          }

          return user;
        }
      }),
    },
    userFavourites: {
      type: userFavouriteType,
      resolve: resolver(models.User, {
        before: (findOptions, args, context) => {
          const userId = _.get(context, 'user.id');
          if (!userId) {
            throw Error('Cannot determine userId');
          }

          findOptions = {
            ...findOptions,
            where: { id: userId },
            // order: [
              // [ models.sequelize.literal('`MonsterViewLogs->MonsterViewLog`.`updatedAt`'), 'DESC' ],
              // [ models.sequelize.literal('`SpellViewLogs->SpellViewLog`.`updatedAt`'), 'DESC' ],
              // [ models.sequelize.literal('`FeatViewLogs->FeatViewLog`.`updatedAt`'), 'DESC' ],
            // ],
            include: [
              {
                association: models.User.associations.MonsterFavourites,
              },
              {
                association: models.User.associations.SpellFavourites,
              },
              {
                association: models.User.associations.FeatFavourites,
              },
            ]
          };

          return findOptions;
        },
      }),
    }
  },
};

