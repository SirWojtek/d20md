import {Monster} from '../../../shared/model/monster';
import {HitDice} from '../../../shared/model/hit-dice';

function goodSave(hdAmount: number): number {
  return 2 + hdAmount / 2;
}

function badSave(hdAmount: number): number {
  return hdAmount / 3;
}

export enum MonsterSubtype {
  Air = 'air',
  Water = 'water',
  Fire = 'fire',
  Earth = 'earth',
}

export interface ITypeOpts {
  subtype?: MonsterSubtype;
}

export interface IMonsterTypeApplier {
  apply: (m: Monster, hdAmount: number, opts?: ITypeOpts) => Monster;
}

export const typeAppliers: {[type: string]: IMonsterTypeApplier} = {
  aberration: {
    apply: (m, hdAmount) => {
      m.HitDices = [new HitDice(8, hdAmount, 'Aberration hit dices')];
      m.hp = HitDice.getSuggestedHp(m.HitDices, m.Attribute.mod.constitution);

      m.Save.will = goodSave(hdAmount);
      m.Save.reflex = badSave(hdAmount);
      m.Save.fortitude = badSave(hdAmount);

      return m;
    },
  },
  animal: {
    apply: (m, hdAmount) => {
      m.HitDices = [new HitDice(8, hdAmount, 'Animal hit dices')];
      m.hp = HitDice.getSuggestedHp(m.HitDices, m.Attribute.mod.constitution);

      m.Attribute.intelligence = 1;
      m.treasure = 'none';

      m.Save.will = badSave(hdAmount);
      m.Save.reflex = goodSave(hdAmount);
      m.Save.fortitude = goodSave(hdAmount);

      return m;
    },
  },
  construct: {
    apply: (m, hdAmount) => {
      m.Attribute.constitution = 0;

      m.HitDices = [new HitDice(10, hdAmount, 'Construct hit dices')];
      m.hp = HitDice.getSuggestedHp(m.HitDices, m.Attribute.mod.constitution);

      m.Save.will = badSave(hdAmount);
      m.Save.reflex = badSave(hdAmount);
      m.Save.fortitude = badSave(hdAmount);

      return m;
    },
  },
  dragon: {
    apply: (m, hdAmount) => {
      m.HitDices = [new HitDice(12, hdAmount, 'Dragon hit dices')];
      m.hp = HitDice.getSuggestedHp(m.HitDices, m.Attribute.mod.constitution);

      m.Save.will = goodSave(hdAmount);
      m.Save.reflex = goodSave(hdAmount);
      m.Save.fortitude = goodSave(hdAmount);

      return m;
    },
  },
  elemental: {
    apply: (m, hdAmount, opts) => {
      m.HitDices = [new HitDice(8, hdAmount, 'Elemental hit dices')];
      m.hp = HitDice.getSuggestedHp(m.HitDices, m.Attribute.mod.constitution);

      m.Save.will = badSave(hdAmount);
      if ([MonsterSubtype.Air, MonsterSubtype.Fire].includes(opts.subtype)) {
        m.Save.reflex = goodSave(hdAmount);
        m.Save.fortitude = badSave(hdAmount);
      } else if (
        [MonsterSubtype.Earth, MonsterSubtype.Water].includes(opts.subtype)
      ) {
        m.Save.reflex = badSave(hdAmount);
        m.Save.fortitude = goodSave(hdAmount);
      } else {
        console.warn('Cannot determine elemental subtype');
        m.Save.reflex = badSave(hdAmount);
        m.Save.fortitude = badSave(hdAmount);
      }

      return m;
    },
  },
  fey: {
    apply: (m, hdAmount) => {
      m.HitDices = [new HitDice(6, hdAmount, 'Fey hit dices')];
      m.hp = HitDice.getSuggestedHp(m.HitDices, m.Attribute.mod.constitution);

      m.Save.reflex = goodSave(hdAmount);
      m.Save.fortitude = badSave(hdAmount);
      m.Save.will = goodSave(hdAmount);

      return m;
    },
  },
  giant: {
    apply: (m, hdAmount) => {
      m.HitDices = [new HitDice(8, hdAmount, 'Giant hit dices')];
      m.hp = HitDice.getSuggestedHp(m.HitDices, m.Attribute.mod.constitution);

      m.Save.reflex = badSave(hdAmount);
      m.Save.fortitude = goodSave(hdAmount);
      m.Save.will = badSave(hdAmount);

      return m;
    },
  },
  humanoid: {
    apply: (m, hdAmount) => {
      m.HitDices = [new HitDice(8, hdAmount, 'Humanoid hit dices')];
      m.hp = HitDice.getSuggestedHp(m.HitDices, m.Attribute.mod.constitution);

      m.Save.reflex = goodSave(hdAmount);
      m.Save.fortitude = badSave(hdAmount);
      m.Save.will = badSave(hdAmount);

      return m;
    },
  },
  'magical beast': {
    apply: (m, hdAmount) => {
      m.HitDices = [new HitDice(10, hdAmount, 'Magical beast hit dices')];
      m.hp = HitDice.getSuggestedHp(m.HitDices, m.Attribute.mod.constitution);

      m.Save.reflex = goodSave(hdAmount);
      m.Save.fortitude = goodSave(hdAmount);
      m.Save.will = badSave(hdAmount);

      return m;
    },
  },
  'monstrous humanoid': {
    apply: (m, hdAmount) => {
      m.HitDices = [new HitDice(8, hdAmount, 'Monstrous humanoid hit dices')];
      m.hp = HitDice.getSuggestedHp(m.HitDices, m.Attribute.mod.constitution);

      m.Save.reflex = goodSave(hdAmount);
      m.Save.fortitude = badSave(hdAmount);
      m.Save.will = goodSave(hdAmount);

      return m;
    },
  },
  ooze: {
    apply: (m, hdAmount) => {
      m.HitDices = [new HitDice(10, hdAmount, 'Oooze hit dices')];
      m.hp = HitDice.getSuggestedHp(m.HitDices, m.Attribute.mod.constitution);

      m.Save.reflex = badSave(hdAmount);
      m.Save.fortitude = badSave(hdAmount);
      m.Save.will = badSave(hdAmount);

      m.Attribute.intelligence = 0;

      return m;
    },
  },
  outsider: {
    apply: (m, hdAmount) => {
      m.HitDices = [new HitDice(8, hdAmount, 'Outsider hit dices')];
      m.hp = HitDice.getSuggestedHp(m.HitDices, m.Attribute.mod.constitution);

      m.Save.reflex = goodSave(hdAmount);
      m.Save.fortitude = goodSave(hdAmount);
      m.Save.will = goodSave(hdAmount);

      return m;
    },
  },
  plant: {
    apply: (m, hdAmount) => {
      m.HitDices = [new HitDice(8, hdAmount, 'Plant hit dices')];
      m.hp = HitDice.getSuggestedHp(m.HitDices, m.Attribute.mod.constitution);

      m.Save.reflex = badSave(hdAmount);
      m.Save.fortitude = goodSave(hdAmount);
      m.Save.will = badSave(hdAmount);

      return m;
    },
  },
  undead: {
    apply: (m, hdAmount) => {
      m.HitDices = [new HitDice(12, hdAmount, 'Undead hit dices')];
      m.hp = HitDice.getSuggestedHp(m.HitDices, m.Attribute.mod.constitution);

      m.Save.reflex = badSave(hdAmount);
      m.Save.fortitude = badSave(hdAmount);
      m.Save.will = goodSave(hdAmount);

      m.Attribute.constitution = 0;

      return m;
    },
  },
  vermin: {
    apply: (m, hdAmount) => {
      m.HitDices = [new HitDice(8, hdAmount, 'Vermin hit dices')];
      m.hp = HitDice.getSuggestedHp(m.HitDices, m.Attribute.mod.constitution);

      m.Save.reflex = badSave(hdAmount);
      m.Save.fortitude = goodSave(hdAmount);
      m.Save.will = badSave(hdAmount);

      m.Attribute.intelligence = 0;

      return m;
    },
  },
};
