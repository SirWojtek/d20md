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
const { simpleMonster } = require('./simple-monster-graphql');
const { enumCache } = require('./enum-cache');

const prerequisiteType = new GraphQLObjectType({
  name: 'Prerequisite',
  fields: attributeFields(models.Feat, {
    exclude: [ 'feat_type' ]
  }),
});

const featType = new GraphQLObjectType({
  name: 'Feat',
  fields: {
    ...attributeFields(models.Feat, { cache: enumCache }),
    Prerequisite: {
      type: new GraphQLList(prerequisiteType),
      resolve: resolver(models.Feat.associations.Prerequisite)
    },
    Monsters: {
      type: new GraphQLList(simpleMonster),
      resolve: resolver(models.Feat.associations.Monsters)
    },
    User: {
      type: simpleUserType,
      resolve: resolver(models.Feat.associations.User)
    },
    isInFavourites: {
      type: GraphQLBoolean,
      resolve: (obj, args, context) => {
        const userId = _.get(context, 'user.id');
        if (!userId) {
          return null;
        }

        return models.Feat.associations.FeatFavourites.throughModel.findOne({
          where: { FeatId: obj.id, UserId: userId }
        }).then(f => f ? true : false);
      }
    },
    favouritesCount: {
      type: GraphQLInt,
      resolve: (obj, args, context) =>
        models.Feat.associations.FeatFavourites.throughModel.count({
            where: { FeatId: obj.id }
        }),
    },
  }
});

const featsWithCount = new GraphQLObjectType({
  name: 'FeatsWithCount',
  fields: {
    feats: { type: new GraphQLList(featType) },
    count: { type: GraphQLInt },
  }
});

module.exports = {
  featType,
  featsWithCount,
  featQueries: {
    feat: {
      type: featType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        userId: { type: GraphQLInt, description: 'Logged user id used for tracking' },
      },
      resolve: resolver(models.Feat, {
        after: (model, args) => {
          // NOTE: done async
          common.addToFeatLog(model, args.userId);
          return common.reportView(model);
        }
      })
    },
    feats: {
      type: featsWithCount,
      args: {
        name: { type: GraphQLString },
        phrase: { type: GraphQLString },
        feat_type: { type: GraphQLString },
        userId: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        asc: { type: new GraphQLList(GraphQLString) },
        desc: { type: new GraphQLList(GraphQLString) },
      },
      resolve: resolver(models.Feat, {
        list: true,
        before: (findOptions, args, context) => {
          findOptions = {
            ...findOptions,
            where: common.buildFindQuery(args, {
              like: ['name'],
              exact: ['feat_type', 'userId' ]
            })
          };

          if (args.phrase) {
            if (findOptions.where) {
              // NOTE: do not perform name search, phrase looks in name
              findOptions.where = _.omit(findOptions.where, [ 'name' ]);
            }

            findOptions.where = {
              ...findOptions.where,
              [ models.sequelize.Op.or ]: [
                { name: { $like: '%' + args.phrase + '%' } },
                { benefit: { $like: '%' + args.phrase + '%' } },
                { normal: { $like: '%' + args.phrase + '%' } },
                { special: { $like: '%' + args.phrase + '%' } },
              ]
            };
          }

          findOptions.order = common.generateOrderList(args.desc, args.asc);

          // NOTE: context is shared between queries from the same request
          // The name of the property must be unique
          context.featsOptions = findOptions;

          return findOptions;
        },
        after: (feats, _, context) => ({
          feats,
          count: models.Feat.count(context.featsOptions)
        })
      })
    },
  },
};

