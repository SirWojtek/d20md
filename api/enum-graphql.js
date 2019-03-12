const {
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList
} = require('graphql');
const _ = require('lodash');
const models = require('../db/models');

function createQuery(queryName, propName, modelName) {
  return {
    [queryName]: {
      type: new GraphQLList(GraphQLString),
      resolve: () => models[modelName].rawAttributes[propName].values,
    }
  }
}

module.exports = {
  enumQueries: {
    dices: {
      type: new GraphQLList(GraphQLInt),
      resolve: () => models.HitDice.rawAttributes.hd_type.validate.isIn.args[0],
    },
    spell_levels: {
      type: new GraphQLList(GraphQLInt),
      resolve: () => _.range(10),
    },
    ...createQuery('spell_saves', 'save_type', 'Spell'),
    ...createQuery('spell_types', 'spell_type', 'Spell'),
    ...createQuery('spell_ranges', 'spell_range', 'Spell'),
    ...createQuery('feat_types', 'feat_type', 'Feat'),
    ...createQuery('attack_types', 'attack_type', 'Attack'),
    ...createQuery('damage_types', 'damage_type', 'Damage'),
    ...createQuery('special_types', 'type', 'Special'),
    ...createQuery('monster_types', 'type', 'Monster'),
    ...createQuery('sizes', 'size', 'Monster'),
    ...createQuery('environment_tags', 'type', 'EnvironmentTag'),
  }
}
