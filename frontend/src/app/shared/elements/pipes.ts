import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

import {Monster} from '../model/monster';
import {Miniature} from './miniature/miniature';
import {Utils} from '../utils';
import {HitDice} from '../model/hit-dice';
import {SpellLevel} from '../model/spell-level';

@Pipe({name: 'monsterToMiniature'})
export class MonsterToMiniaturePipe implements PipeTransform {
  transform(monster: Monster): Miniature {
    return Utils.toMiniature(monster);
  }
}

@Pipe({name: 'monstersToMiniatures'})
export class MonstersToMiniaturesPipe implements PipeTransform {
  transform(monster: Monster[]): Miniature[] {
    return monster.map(Utils.toMiniature);
  }
}

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    return Object.keys(value);
  }
}

@Pipe({name: 'startCase'})
export class StartCasePipe implements PipeTransform {
  transform(text: string): string {
    return _.startCase(text);
  }
}

@Pipe({name: 'hitDice'})
export class HitDicePipe implements PipeTransform {
  transform(hd: HitDice): string {
    return `${hd.hd_amount}k${hd.hd_type}`;
  }
}

@Pipe({name: 'spellLevel'})
export class SpellLevelPipe implements PipeTransform {
  transform(level: SpellLevel): string {
    return `${level.level} ${level.class_name}`;
  }
}
