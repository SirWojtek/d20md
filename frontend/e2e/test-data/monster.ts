import {IMonsterInfo} from '../interfaces/monster/IMonsterInfo';

export const monster: IMonsterInfo = {
  name: 'Wolf',
  saves: {
    will: {
      total: 1,
      base: 0,
    },
    reflex: {
      total: 5,
      base: 3,
    },
    fortitude: {
      total: 5,
      base: 3,
    },
  },
  hitDices: [
    {
      multiplier: 2,
      diceType: 8,
    },
  ],
  hp: 13,
  initiative: 2,
  type: 'Animal',
  attributes: {
    strength: {
      value: 13,
      modifier: 1,
    },
    dexterity: {
      value: 15,
      modifier: 2,
    },
    constitution: {
      value: 15,
      modifier: 2,
    },
    wisdom: {
      value: 12,
      modifier: 1,
    },
    intelligence: {
      value: 2,
      modifier: -4,
    },
    charisma: {
      value: 6,
      modifier: -2,
    },
  },
  armor: {
    base: 10,
    armor: 0,
    shield: 0,
    dexterity: 2,
    size: 0,
    enhancement: 0,
    deflection: 0,
    natural: 2,
    touch: 12,
    flatFooted: 12,
    total: 14,
  },
  movement: {
    fly: 0,
    swim: 0,
    climb: 0,
    land: 50,
    burrow: 0,
  },
  skills: {
    hide: {
      modifier: 0,
      total: 2,
    },
    listen: {
      modifier: 2,
      total: 3,
    },
    moveSilently: {
      modifier: 1,
      total: 3,
    },
    spot: {
      modifier: 2,
      total: 3,
    },
    survival: {
      modifier: 0,
      total: 1,
    },
  },
  feats: [
    {
      name: 'Weapon Focus (bite)',
      benefit:
        'You gain a +1 bonus on all attack rolls you make using the selected weapon.',
    },
  ],
  specials: [
    {
      name: 'Trip',
      description:
        // tslint:disable-next-line:max-line-length
        'A wolf that hits with a bite attack can attempt to trip the opponent (+1 check modifier) as a free action without making a touch attack or provoking an attack of opportunity. If the attempt fails, the opponent cannot react to trip the wolf.',
    },
  ],
};
