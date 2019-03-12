import gql from 'graphql-tag';

export const getQueryMap = {
  basic: gql`
    query basic($id: Int!, $userId: Int) {
      spell(id: $id, userId: $userId) {
        id
        name
        description
        save_type
        permits_sr
        spell_type
        spell_range
        range_info
        SpellLevels {
          class_name
          level
        }
        Monsters {
          id
          name
        }
        User {
          id
        }
      }
    }
  `,
};

export const findSpellsQuery = gql`
  query findSpells(
    $name: String
    $spell_type: String
    $spell_range: String
    $class_name: String
    $min_level: Int
    $max_level: Int
    $limit: Int!
    $offset: Int!
    $asc: [String]
    $desc: [String]
  ) {
    spells(
      name: $name
      spell_type: $spell_type
      spell_range: $spell_range
      class_name: $class_name
      min_level: $min_level
      max_level: $max_level
      limit: $limit
      offset: $offset
      asc: $asc
      desc: $desc
    ) {
      count
      spells {
        id
        name
        description
        spell_type
        spell_range
        range_info
        SpellLevels {
          class_name
          level
        }
      }
    }
  }
`;
