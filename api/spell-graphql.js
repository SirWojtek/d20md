const { attributeFields, resolver } = require('graphql-sequelize');
const _ = require('lodash');
const {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean,
} = require('graphql');
const models = require('../db/models');
const common = require('../backend/common');
const { simpleUserType } = require('./simple-user-graphql');
const { simpleMonster } = require('./simple-monster-graphql');
const { enumCache } = require('./enum-cache');

const levelFields = [ 'class_name', 'level' ];

const spellLevelType = new GraphQLObjectType({
  name: 'SpellLevel',
  fields: attributeFields(models.SpellLevel),
});

const spellType = new GraphQLObjectType({
  name: 'Spell',
  fields: {
    ...attributeFields(models.Spell, { cache: enumCache }),
    SpellLevels: {
      type: new GraphQLList(spellLevelType),
      resolve: resolver(models.Spell.associations.SpellLevels)
    },
    Monsters: {
      type: new GraphQLList(simpleMonster),
      resolve: resolver(models.Spell.associations.Monsters)
    },
    User: {
      type: simpleUserType,
      resolve: resolver(models.Spell.associations.User)
    },
    isInFavourites: {
      type: GraphQLBoolean,
      resolve: (obj, args, context) => {
        const userId = _.get(context, 'user.id');
        if (!userId) {
          return null;
        }

        return models.Spell.associations.SpellFavourites.throughModel.findOne({
          where: { SpellId: obj.id, UserId: userId }
        }).then(f => f ? true : false);
      }
    },
    favouritesCount: {
      type: GraphQLInt,
      resolve: (obj, args, context) =>
        models.Spell.associations.SpellFavourites.throughModel.count({
            where: { SpellId: obj.id }
        }),
    },
  }
});

const spellsWithCount = new GraphQLObjectType({
  name: 'SpellWithCount',
  fields: {
    spells: { type: new GraphQLList(spellType) },
    count: { type: GraphQLInt },
  }
});

module.exports = {
  spellType,
  spellsWithCount,
  spellQueries: {
    spell: {
      type: spellType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        userId: { type: GraphQLInt, description: 'Logged user id used for tracking' },
      },
      resolve: resolver(models.Spell, {
        after: (model, args) => {
          // NOTE: done async
          common.addToSpellLog(model, args.userId);
          return common.reportView(model);
        }
      })
    },
    spells: {
      type: spellsWithCount,
      args: {
        name: { type: GraphQLString, },
        spell_type: { type: GraphQLString, },
        spell_range: { type: GraphQLString, },
        class_name: { type: GraphQLString, },
        min_level: { type: GraphQLInt, },
        max_level: { type: GraphQLInt, },
        userId: { type: GraphQLInt },
        offset: { type: new GraphQLNonNull(GraphQLInt) },
        limit: { type: new GraphQLNonNull(GraphQLInt) },
        asc: { type: new GraphQLList(GraphQLString) },
        desc: { type: new GraphQLList(GraphQLString) },
      },
      resolve: resolver(models.Spell, {
        list: true,
        before: (findOptions, args, context) => {
          const [ levelDesc, spellDesc ] = _.partition(args.desc, field => levelFields.includes(field));
          const [ levelAsc, spellAsc ] = _.partition(args.asc, field => levelFields.includes(field));

          findOptions = {
            ...findOptions,
            distinct: true,
            order: [
              ...common.generateOrderList(spellDesc, spellAsc),
              ...common.generateOrderList(levelDesc, levelAsc, models.SpellLevel),
            ],
            where: common.buildFindQuery(args, {
              like: ['name'],
              exact: ['spell_type', 'spell_range', 'userId'],
            }),
            include: [{
              model: models.SpellLevel,
              where: common.buildFindQuery(args, {
                like: ['class_name'], range: ['level']
              })
            }]
          };

          // NOTE: context is shared between queries from the same request
          // The name of the property must be unique
          context.spellsOptions = findOptions;
          return findOptions;
        },
        after: (spells, _, context) => ({
          spells,
          count: models.Spell.count(context.spellsOptions)
        }),
      }),
    },
  },
};
