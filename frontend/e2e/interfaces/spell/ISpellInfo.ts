import {ILevel} from './ILevel';

export interface ISpellInfo {
  name: string;
  type: string;
  range: string;
  saveType: string;
  spellResistable: boolean;
  levels: ILevel[];
  description: string;
}
