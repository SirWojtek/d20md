const { attributeFields, resolver } = require('graphql-sequelize');
const { GraphQLObjectType, GraphQLList } = require('graphql');
const models = require('../db/models');

const damageType = new GraphQLObjectType({
  name: 'Damage',
  fields: attributeFields(models.Damage),
});
const attackType = new GraphQLObjectType({
  name: 'Attack',
  fields: {
    ...attributeFields(models.Attack),
    Damages: {
      type: new GraphQLList(damageType),
      resolve: resolver(models.Attack.associations.Damages)
    }
  }
});

module.exports = {
  imageType: new GraphQLObjectType({
    name: 'Image',
    fields: attributeFields(models.Image),
  }),
  attributeType: new GraphQLObjectType({
    name: 'Attribute',
    fields: attributeFields(models.Attribute),
  }),
  skillType: new GraphQLObjectType({
    name: 'Skill',
    fields: attributeFields(models.Skill),
  }),
  armorType: new GraphQLObjectType({
    name: 'Armor',
    fields: attributeFields(models.Armor),
  }),
  saveType: new GraphQLObjectType({
    name: 'Save',
    fields: attributeFields(models.Save),
  }),
  speedType: new GraphQLObjectType({
    name: 'Speed',
    fields: attributeFields(models.Speed),
  }),
  attackGroupType: new GraphQLObjectType({
    name: 'AttackGroup',
    fields: {
      ...attributeFields(models.AttackGroup),
      Attacks: {
        type: new GraphQLList(attackType),
        resolve: resolver(models.AttackGroup.associations.Attacks)
      }
    }
  }),
  hitDiceType: new GraphQLObjectType({
    name: 'HitDice',
    fields: attributeFields(models.HitDice),
  }),
  specialType: new GraphQLObjectType({
    name: 'Special',
    fields: attributeFields(models.Special),
  }),
  environmentTagType: new GraphQLObjectType({
    name: 'EnvironmentTag',
    fields: attributeFields(models.EnvironmentTag),
  }),
  alignmentType: new GraphQLObjectType({
    name: 'Alignment',
    fields: attributeFields(models.Alignment),
  }),
  advancementType: new GraphQLObjectType({
    name: 'Advancement',
    fields: attributeFields(models.Advancement),
  }),
  monsterDescriptionType: new GraphQLObjectType({
    name: 'MonsterDescriptor',
    fields: attributeFields(models.MonsterDescriptor),
  }),
};

