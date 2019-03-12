import {IMonsterInfo} from '../interfaces/monster/IMonsterInfo';

export const defaultMonster: IMonsterInfo = {
  name: 'Default',
  saves: {
    will: {
      total: 3,
      base: 3,
    },
    reflex: {
      total: 3,
      base: 3,
    },
    fortitude: {
      total: 3,
      base: 3,
    },
  },
  hitDices: [
    {
      multiplier: 1,
      diceType: 4,
    },
  ],
  hp: 2,
  initiative: 0,
  type: 'Humanoid',
  attributes: {
    strength: {
      value: 10,
      modifier: 0,
    },
    dexterity: {
      value: 10,
      modifier: 0,
    },
    constitution: {
      value: 10,
      modifier: 0,
    },
    wisdom: {
      value: 10,
      modifier: 0,
    },
    intelligence: {
      value: 10,
      modifier: 0,
    },
    charisma: {
      value: 10,
      modifier: 0,
    },
  },
  armor: {
    base: 10,
    armor: 0,
    shield: 0,
    dexterity: 0,
    size: 0,
    enhancement: 0,
    deflection: 0,
    natural: 0,
    touch: 10,
    flatFooted: 10,
    total: 10,
  },
  movement: {
    fly: 0,
    swim: 0,
    climb: 0,
    land: 0,
    burrow: 0,
  },
  skills: {
    hide: {
      modifier: 0,
      total: 0,
    },
    listen: {
      modifier: 0,
      total: 0,
    },
    moveSilently: {
      modifier: 0,
      total: 0,
    },
    spot: {
      modifier: 0,
      total: 0,
    },
    survival: {
      modifier: 0,
      total: 0,
    },
  },
  feats: [],
  specials: [],
};
