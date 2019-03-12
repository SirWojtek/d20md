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

const viewLogType = new GraphQLObjectType({
  name: 'ViewLogType',
  fields: {
    updatedAt: { type: GraphQLString }
  }
});

const monsterLogType = new GraphQLObjectType({
  name: 'MonsterLogType',
  fields: {
    ...attributeFields(models.Monster),
    MonsterViewLog: { type: viewLogType },
  }
});
const spellLogType = new GraphQLObjectType({
  name: 'SpellLogType',
  fields: {
    ...attributeFields(models.Spell),
    SpellViewLog: { type: viewLogType },
  }
});
const featLogType = new GraphQLObjectType({
  name: 'FeatLogType',
  fields: {
    ...attributeFields(models.Feat),
    FeatViewLog: { type: viewLogType },
  }
});

const userType = new GraphQLObjectType({
  name: 'User',
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

module.exports = {
  userType,
  userQueries: {
    userHistory: {
      type: userType,
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
    }
  },
};

