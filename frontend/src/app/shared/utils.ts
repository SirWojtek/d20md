import { Monster } from './model/monster';
import { Miniature } from './elements//miniature/miniature';
import * as _ from 'lodash';

export class Utils {
  static createUpperCaseToNoUpperCaseMap(array: string[]): { [index: string]: string; } {
    const result: { [index: string]: string; } = {};

    array.forEach((value: string) => {
      result[Utils.toUpperCase(value)] = value;
    });

    return result;
  }

  static createDicesMap(dices: number[]): { [index: string]: number; } {
    return _.reduce(dices, (result, dice: number) => {
      result[dice.toString()] = dice;
      return result;
    }, {});
  }

  static toUpperCase(s: string): string {
    return typeof s !== 'string' ? s : s.charAt(0).toUpperCase() + s.slice(1);
  }

  static toMiniature(monster: Monster): Miniature {
    return new Miniature(
      monster.name,
      '/monsters/show/' + monster.id,
      monster.Image ? monster.Image.path : null,
      monster.description);
  }

  static getNestedProperty(obj: any, property: string): any {
    const splitted = property.split('.');

    if (splitted.length === 1) {
      return obj[splitted[0]];
    } else {
      return Utils.getNestedProperty(obj[splitted[0]], splitted.shift());
    }
  }
}
