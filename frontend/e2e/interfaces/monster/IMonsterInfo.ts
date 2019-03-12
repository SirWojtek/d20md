import {ISaves} from './ISaves';
import {IHitDice} from './IHitDice';
import {IAttributes} from './IAttributes';
import {IArmor} from './IArmor';
import {IMovement} from './IMovement';
import {ISkills} from './ISkills';
import {IFeat} from './IFeat';
import {ISpecial} from './ISpecial';

export interface IMonsterInfo {
  name: string;
  saves: ISaves;
  hitDices: IHitDice[];
  hp: number;
  initiative: number;
  type: string;
  attributes: IAttributes;
  armor: IArmor;
  movement: IMovement;
  skills: ISkills;
  feats: IFeat[];
  specials: ISpecial[];
}
