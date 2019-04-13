const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLID,
  GraphQLEnumType,
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
    addMonsterToFavourites: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (obj, args, context) => {
        const userId = _.get(context, 'user.id');
        if (!userId) {
          throw Error('Cannot determine userId');
        }

        return Promise.all([
          models.User.findById(userId),
          models.Monster.findById(args.id)
        ]).then(([ user, monster ]) => {
          if (!user) {
            throw new Error('User does not exists');
          }
          if (!monster) {
            throw new Error('Monster does not exists');
          }

          return user.addMonsterFavourite(monster);
        });
      },
    },
    addSpellToFavourites: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (obj, args, context) => {
        const userId = _.get(context, 'user.id');
        if (!userId) {
          throw Error('Cannot determine userId');
        }

        return Promise.all([
          models.User.findById(userId),
          models.Spell.findById(args.id)
        ]).then(([ user, spell ]) => {
          if (!user) {
            throw new Error('User does not exists');
          }
          if (!spell) {
            throw new Error('Spell does not exists');
          }

          return user.addSpellFavourite(spell);
        });
      },
    },
    addFeatToFavourites: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (obj, args, context) => {
        const userId = _.get(context, 'user.id');
        if (!userId) {
          throw Error('Cannot determine userId');
        }

        return Promise.all([
          models.User.findById(userId),
          models.Feat.findById(args.id)
        ]).then(([ user, feat ]) => {
          if (!user) {
            throw new Error('User does not exists');
          }
          if (!feat) {
            throw new Error('Feat does not exists');
          }

          return user.addFeatFavourite(feat);
        });
      },
    },
    removeMonsterFromFavourites: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (obj, args, context) => {
        const userId = _.get(context, 'user.id');
        if (!userId) {
          throw Error('Cannot determine userId');
        }

        return models.User.findById(userId, {
          include: [{ association: models.User.associations.MonsterFavourites }]
        }).then(user => {
          if (!user) {
            throw new Error('User does not exists');
          }

          return user.setMonsterFavourites(
            user.MonsterFavourites.filter(f => f.id !== Number(args.id))
          );
        });
      },
    },
    removeSpellFromFavourites: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (obj, args, context) => {
        const userId = _.get(context, 'user.id');
        if (!userId) {
          throw Error('Cannot determine userId');
        }

        return models.User.findById(userId, {
          include: [{ association: models.User.associations.SpellFavourites }]
        }).then(user => {
          if (!user) {
            throw new Error('User does not exists');
          }

          return user.setSpellFavourites(
            user.SpellFavourites.filter(f => f.id !== Number(args.id))
          );
        });
      },
    },
    removeFeatFromFavourites: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (obj, args, context) => {
        const userId = _.get(context, 'user.id');
        if (!userId) {
          throw Error('Cannot determine userId');
        }

        return models.User.findById(userId, {
          include: [{ association: models.User.associations.FeatFavourites }]
        }).then(user => {
          if (!user) {
            throw new Error('User does not exists');
          }

          return user.setFeatFavourites(
            user.FeatFavourites.filter(f => f.id !== Number(args.id))
          );
        });
      },
    },
  }
};
