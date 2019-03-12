import gql from 'graphql-tag';

export const userHistoryQuery = gql`
  {
    userHistory {
      MonsterViewLogs {
        id
        name
        MonsterViewLog {
          updatedAt
        }
      }
      SpellViewLogs {
        id
        name
        SpellViewLog {
          updatedAt
        }
      }
      FeatViewLogs {
        id
        name
        FeatViewLog {
          updatedAt
        }
      }
    }
  }
`;

export const lastUpdatedQuery = gql`
  {
    monsters(desc: ["updatedAt"], limit: 10, offset: 0) {
      monsters {
        id
        name
        updatedAt
      }
    }
    spells(desc: ["updatedAt"], limit: 10, offset: 0) {
      spells {
        id
        name
        updatedAt
      }
    }
    feats(desc: ["updatedAt"], limit: 10, offset: 0) {
      feats {
        id
        name
        updatedAt
      }
    }
  }
`;

export const popularQuery = gql`
  {
    monsters(desc: ["views"], limit: 10, offset: 0) {
      monsters {
        id
        name
        views
      }
    }
    spells(desc: ["views"], limit: 10, offset: 0) {
      spells {
        id
        name
        views
      }
    }
    feats(desc: ["views"], limit: 10, offset: 0) {
      feats {
        id
        name
        views
      }
    }
  }
`;

export const userMonstersQuery = gql`
  query userMonsters(
    $userId: Int!
    $name: String
    $offset: Int!
    $limit: Int!
    $asc: [String]
    $desc: [String]
  ) {
    monsters(
      name: $name
      userId: $userId
      offset: $offset
      limit: $limit
      asc: $asc
      desc: $desc
    ) {
      count
      monsters {
        id
        name
        views
        HitDices {
          hd_type
          hd_amount
        }
        Attribute {
          strength
          dexterity
          constitution
          wisdom
          intelligence
          charisma
        }
        Save {
          fortitude
          will
          reflex
        }
      }
    }
  }
`;

export const userSpellsQuery = gql`
  query userSpells(
    $userId: Int!
    $name: String
    $type: String
    $offset: Int!
    $limit: Int!
    $asc: [String]
    $desc: [String]
  ) {
    spells(
      name: $name
      spell_type: $type
      userId: $userId
      offset: $offset
      limit: $limit
      asc: $asc
      desc: $desc
    ) {
      count
      spells {
        id
        name
        spell_type
        views
        SpellLevels {
          level
          class_name
        }
      }
    }
  }
`;

export const userFeatsQuery = gql`
  query userFeats(
    $userId: Int!
    $name: String
    $type: String
    $offset: Int!
    $limit: Int!
    $asc: [String]
    $desc: [String]
  ) {
    feats(
      name: $name
      feat_type: $type
      userId: $userId
      offset: $offset
      limit: $limit
      asc: $asc
      desc: $desc
    ) {
      count
      feats {
        id
        name
        feat_type
        views
      }
    }
  }
`;

export const userEntitiesCountQuery = gql`
  query userEntitiesCount($userId: Int!) {
    monsters(offset: 0, limit: 0, userId: $userId) {
      count
    }
    spells(offset: 0, limit: 0, userId: $userId) {
      count
    }
    feats(offset: 0, limit: 0, userId: $userId) {
      count
    }
  }
`;
