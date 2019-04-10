const { attributeFields, resolver } = require('graphql-sequelize');
const {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean,
} = require('graphql');
const _ = require('lodash');
const models = require('../db/models');
const common = require('../backend/common');
const { simpleUserType } = require('./simple-user-graphql');
const { featType } = require('./feat-graphql');
const { spellType } = require('./spell-graphql');
const monsterTypes = require('./monster-types-graphql');
const { enumCache } = require('./enum-cache');

const monsterType = new GraphQLObjectType({
  name: 'Monster',
  fields: {
    ...attributeFields(models.Monster, { cache: enumCache }),
    Image: {
      type: monsterTypes.imageType,
      resolve: resolver(models.Monster.associations.Image),
    },
    Attribute: {
      type: monsterTypes.attributeType,
      resolve: resolver(models.Monster.associations.Attribute),
    },
    Skill: {
      type: monsterTypes.skillType,
      resolve: resolver(models.Monster.associations.Skill),
    },
    Armor: {
      type: monsterTypes.armorType,
      resolve: resolver(models.Monster.associations.Armor),
    },
    Save: {
      type: monsterTypes.saveType,
      resolve: resolver(models.Monster.associations.Save),
    },
    Speed: {
      type: monsterTypes.speedType,
      resolve: resolver(models.Monster.associations.Speed),
    },
    AttackGroups: {
      type: new GraphQLList(monsterTypes.attackGroupType),
      resolve: resolver(models.Monster.associations.AttackGroups),
    },
    HitDices: {
      type: new GraphQLList(monsterTypes.hitDiceType),
      resolve: resolver(models.Monster.associations.HitDices),
    },
    Specials: {
      type: new GraphQLList(monsterTypes.specialType),
      resolve: resolver(models.Monster.associations.Specials),
    },
    EnvironmentTags: {
      type: new GraphQLList(monsterTypes.environmentTagType),
      resolve: resolver(models.Monster.associations.EnvironmentTags),
    },
    Alignments: {
      type: new GraphQLList(monsterTypes.alignmentType),
      resolve: resolver(models.Monster.associations.Alignments),
    },
    Advancements: {
      type: new GraphQLList(monsterTypes.advancementType),
      resolve: resolver(models.Monster.associations.Advancements),
    },
    MonsterDescriptors: {
      type: new GraphQLList(monsterTypes.monsterDescriptionType),
      resolve: resolver(models.Monster.associations.MonsterDescriptors),
    },
    Spells: {
      type: new GraphQLList(spellType),
      resolve: resolver(models.Monster.associations.Spells),
    },
    Feats: {
      type: new GraphQLList(featType),
      resolve: resolver(models.Monster.associations.Feats),
    },
    User: {
      type: simpleUserType,
      resolve: resolver(models.Monster.associations.User),
    },
    isInFavourites: {
      type: GraphQLBoolean,
      resolve: (obj, args, context) => {
        const userId = _.get(context, 'user.id');
        if (!userId) {
          return null;
        }

        return models.Monster.associations.MonsterFavourites.throughModel.findOne({
          where: { MonsterId: obj.id, UserId: userId }
        }).then(f => f ? true : false);
      }
    },
    favouritesCount: {
      type: GraphQLInt,
      resolve: (obj, args, context) =>
        models.Monster.associations.MonsterFavourites.throughModel.count({
            where: { MonsterId: obj.id }
        }),
    },
  }
});

const monstersWithCount = new GraphQLObjectType({
  name: 'MonsterWithCount',
  fields: {
    monsters: { type: new GraphQLList(monsterType) },
    count: { type: GraphQLInt },
  }
});

module.exports = {
  monsterType,
  monstersWithCount,
  monsterQueries: {
    monster: {
      type: monsterType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        userId: { type: GraphQLInt, description: 'Logged user id used for tracking' },
      },
      resolve: resolver(models.Monster, {
        after: (model, args) => {
          if (!model) {
            return;
          }
          // NOTE: done async
          common.addToMonsterLog(model, args.userId);
          return common.reportView(model);
        }
      }),
    },
    monsters: {
      type: monstersWithCount,
      args: {
        name: { type: GraphQLString, },
        size: { type: GraphQLString, },
        type: { type: GraphQLString, },
        min_challenge_rating: { type: GraphQLInt, },
        max_challenge_rating: { type: GraphQLInt, },
        min_hd_sum: { type: GraphQLInt, },
        max_hd_sum: { type: GraphQLInt, },
        min_armor_sum: { type: GraphQLInt, },
        max_armor_sum: { type: GraphQLInt, },
        min_attack_max: { type: GraphQLInt, },
        max_attack_max: { type: GraphQLInt, },
        min_hp: { type: GraphQLInt, },
        max_hp: { type: GraphQLInt, },
        environment_tags: { type: new GraphQLList(GraphQLString) },
        userId: { type: GraphQLInt },
        offset: { type: new GraphQLNonNull(GraphQLInt) },
        limit: { type: new GraphQLNonNull(GraphQLInt) },
        asc: { type: new GraphQLList(GraphQLString) },
        desc: { type: new GraphQLList(GraphQLString) },
      },
      resolve: resolver(models.Monster, {
        list: true,
        before: (findOptions, args, context) => {
          findOptions = {
            ...findOptions,
            distinct: true,
            order: common.generateOrderList(args.desc, args.asc),
            where: common.buildFindQuery(args, {
              like: ['name'],
              exact: ['size', 'type', 'userId'],
              range: ['challenge_rating', 'hd_sum', 'armor_sum', 'attack_max', 'hp']
            }),
            include: [
              {
                model: models.EnvironmentTag,
                where: common.buildFindQuery(args, { tag: 'environment_tags'})
              },
            ]
          };

          // NOTE: context is shared between queries from the same request
          // The name of the property must be unique
          context.monstersOptions = findOptions;
          return findOptions;
        },
        after: (monsters, _, context) => ({
          monsters,
          count: models.Monster.count(context.monstersOptions)
        }),
      }),
    },
  }
}
