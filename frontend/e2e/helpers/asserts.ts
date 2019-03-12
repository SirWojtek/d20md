import {ISpellInfo} from '../interfaces/spell/ISpellInfo';
import {IFeatInfo} from '../interfaces/feat/IFeatInfo';

export function assertSpellEquals(x: ISpellInfo, y: ISpellInfo) {
  expect(x.name).toEqual(y.name);
  expect(x.range).toEqual(y.range);
  expect(x.type).toEqual(y.type);
  expect(x.saveType).toEqual(y.saveType);
  expect(x.spellResistable).toEqual(y.spellResistable);
  expect(x.levels).toEqual(y.levels);
  expect(x.description).toBeTruthy();
}

export function assertFeatEquals(x: IFeatInfo, y: IFeatInfo) {
  expect(x.name).toEqual(y.name);
  expect(x.type).toEqual(y.type);
  expect(x.benefit).toContain(y.benefit);
  expect(x.normal).toBeNull();
  expect(x.special).toContain(y.special);
}
