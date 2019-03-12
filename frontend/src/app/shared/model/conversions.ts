
import { Spell } from './spell';
import { Feat } from './feat';
import { SpecialAbility } from './special-ability';
import { Monster } from './monster';
import { SpellLevel } from './spell-level';
import { AttackGroup } from './attack-group';
import { Attack } from './attack';
import { Damage } from './damage';
import { HitDice } from './hit-dice';
import { EnvironmentTag } from './environment-tag';

namespace ArrayAliases {
  export function Spells() { return new Spell(); }
  export function Feats() { return new Feat(); }
  export function Specials() { return new SpecialAbility(); }
  export function Monsters() { return new Monster(); }
  export function Prerequisite() { return new Feat(); }
  export function SpellLevels() { return new SpellLevel(); }
  export function AttackGroups() { return new AttackGroup(); }
  export function Attacks() { return new Attack(); }
  export function Damages() { return new Damage(); }
  export function HitDices() { return new HitDice(); }
  export function EnvironmentTags() { return new EnvironmentTag(); }
}

export function fromJson(json: any, objectType: any): any {
  return json instanceof Array ?
    arrayFromJson(json, objectType) :
    objectFromJson(json, new objectType());
}

function arrayFromJson(json: any, objectType) {
  const result = [];

  for (const el of json) {
    result.push(objectFromJson(el, new objectType()));
  }

  return result;
}

function objectFromJson(json: any, obj: JsonSerializable): any {
  for (const key in obj) {
    if (json[key] === undefined || typeof obj[key] === 'function') { continue; }
    if (key === 'excludedParams') { continue; }  // NOTE: ignore interface field
    if (obj.excludedParams.indexOf(key) !== -1) { continue; }

    if (obj[key] instanceof Array && json[key] instanceof Array) {
      obj[key] = [];

      for (const item of json[key]) {
        obj[key].push(objectFromJson(item, new ArrayAliases[key]()));
      }
    } else if (typeof obj[key] !== 'object') {
      obj[key] = json[key];
    } else if (json[key] !== null) {
      objectFromJson(json[key], obj[key]);
    }
  }

  obj.afterConstructionFromJson();
  return obj;
}

export interface JsonSerializable {
  excludedParams: string[];
  afterConstructionFromJson();
}

export function toJson(obj: JsonSerializable): any {
  if (!obj) { return obj; }
  const json = {};

  for (const key in obj) {
    if (key === 'excludedParams') { continue; }  // NOTE: ignore interface field
    if (key.startsWith('_')) { continue; }  // NOTE: ignore private members
    if (obj.excludedParams.indexOf(key) !== -1) { continue; }

    if (obj[key] instanceof Array) {
      json[key] = [];

      for (const item of obj[key]) {
        json[key].push(toJson(item));
      }
    } else if (typeof obj[key] === 'object') {
      json[key] = toJson(obj[key]);
    } else if (typeof obj[key] !== 'function') {
      json[key] = obj[key];
    }
  }

  return json;
}
