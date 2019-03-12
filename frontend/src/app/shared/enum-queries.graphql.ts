import gql from 'graphql-tag';

function createEnumQuery(name: string) {
  return { [name]: gql`
    query ${name}_enum {
      ${name}
    }
    `
  };
}

export const enumQueryMap = {
  ...createEnumQuery('spell_levels'),
  ...createEnumQuery('spell_saves'),
  ...createEnumQuery('spell_types'),
  ...createEnumQuery('spell_ranges'),
  ...createEnumQuery('feat_types'),
  ...createEnumQuery('attack_types'),
  ...createEnumQuery('dices'),
  ...createEnumQuery('damage_types'),
  ...createEnumQuery('special_types'),
  ...createEnumQuery('monster_types'),
  ...createEnumQuery('sizes'),
  ...createEnumQuery('environment_tags'),
};
