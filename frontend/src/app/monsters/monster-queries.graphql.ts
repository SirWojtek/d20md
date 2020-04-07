import gql from 'graphql-tag';

import { Skill } from '../shared/model/skill';

function getSkills() {
  return new Skill().getParams();
}

const baseQuery = `
  id
  name
  Attribute {
    strength
    dexterity
    constitution
    wisdom
    intelligence
    charisma
  }
  User { id }
`;

const basicQuery = `
  hp
  initiative
  type
  isInFavourites
  favouritesCount
  Save {
    fortitude
    will
    reflex
  }
  HitDices {
    hd_amount
    hd_type
    description
  }
  Image {
    path
  }
`;

const defencesQuery = `
  Armor {
    armor
    shield
    size
    enhancement
    deflection
    natural
  }
`;

const attacksQuery = `
  AttackGroups {
    Attacks {
      name
      is_main
      attack_type
      attack_bonus
      range
      Damages {
        dd_type
        dd_amount
        damage_bonus
        damage_type
        critical
        description
      }
    }
  }
`;

const movementQuery = `
  Speed {
    fly
    swim
    climb
    land
    burrow
  }
`;

const skillQuery = `
  Skill {
    ${getSkills()}
  }
`;

const featsQuery = `
  Feats {
    id
    name
    benefit
  }
`;

const spellsQuery = `
  Spells {
    id
    name
    description
    SpellLevels {
      class_name
      level
    }
  }
`;

const specialQuery = `
  Specials {
    type
    name
    description
  }
`;

export const getQueryMap = {
  basic: gql`
    query basic($id: Int!, $userId: Int) {
      monster(id: $id, userId: $userId) {
        ${baseQuery}
        ${basicQuery}
      }
    }
  `,
  defences: gql`
    query defences($id: Int!, $userId: Int) {
      monster(id: $id, userId: $userId) {
        ${baseQuery}
        ${defencesQuery}
      }
    }
  `,
  attacks: gql`
    query attacks($id: Int!, $userId: Int) {
      monster(id: $id, userId: $userId) {
        ${baseQuery}
        ${attacksQuery}
      }
    }
  `,
  movement: gql`
    query movement($id: Int!, $userId: Int) {
      monster(id: $id, userId: $userId) {
        ${baseQuery}
        ${movementQuery}
      }
    }
  `,
  skills: gql`
    query skills($id: Int!, $userId: Int) {
      monster(id: $id, userId: $userId) {
        ${baseQuery}
        ${skillQuery}
      }
    }
  `,
  feats: gql`
    query feats($id: Int!, $userId: Int) {
      monster(id: $id, userId: $userId) {
        ${baseQuery}
        ${featsQuery}
      }
    }
  `,
  spells: gql`
    query spells($id: Int!, $userId: Int) {
      monster(id: $id, userId: $userId) {
        ${baseQuery}
        ${spellsQuery}
      }
    }
  `,
  special: gql`
    query special($id: Int!, $userId: Int) {
      monster(id: $id, userId: $userId) {
        ${baseQuery}
        ${specialQuery}
      }
    }
  `,
  description: gql`
    query description($id: Int!, $userId: Int) {
      monster(id: $id, userId: $userId) {
        ${baseQuery}
        description
      }
    }
  `,
  all: gql`
    query all($id: Int!, $userId: Int) {
      monster(id: $id, userId: $userId) {
        ${baseQuery}
        ${basicQuery}
        ${defencesQuery}
        ${attacksQuery}
        ${movementQuery}
        ${skillQuery}
        ${featsQuery}
        ${spellsQuery}
        ${specialQuery}
        description
      }
    }
  `
};

export const findMonstersQuery = gql`
  query findMonsters(
    $name: String
    $size: String
    $type: String
    $min_challenge_rating: Int
    $max_challenge_rating: Int
    $min_hd_sum: Int
    $max_hd_sum: Int
    $min_armor_sum: Int
    $max_armor_sum: Int
    $min_attack_max: Int
    $max_attack_max: Int
    $min_hp: Int
    $max_hp: Int
    $environment_tags: [String]
    $limit: Int!
    $offset: Int!
    $asc: [String]
    $desc: [String]
  ) {
    monsters(
      name: $name
      size: $size
      type: $type
      min_challenge_rating: $min_challenge_rating
      max_challenge_rating: $max_challenge_rating
      min_hd_sum: $min_hd_sum
      max_hd_sum: $max_hd_sum
      min_armor_sum: $min_armor_sum
      max_armor_sum: $max_armor_sum
      min_attack_max: $min_attack_max
      max_attack_max: $max_attack_max
      min_hp: $min_hp
      max_hp: $max_hp
      environment_tags: $environment_tags
      limit: $limit
      offset: $offset
      asc: $asc
      desc: $desc
    ) {
      count
      monsters {
        id
        name
        size
        type
        challenge_rating
        armor_sum
        attack_max
        hp
        isInFavourites
        HitDices {
          hd_type
          hd_amount
        }
        EnvironmentTags {
          type
        }
        Image {
          path
        }
      }
    }
  }
`;
