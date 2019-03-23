import {Monster} from './monster';
import {SpellLevel} from './spell-level';
import * as user from './user';
import {JsonSerializable} from './conversions';

export class Spell implements JsonSerializable {
  public excludedParams = [];
  public afterConstructionFromJson() {}

  constructor(
    public id: number = -1,
    public name: string = '',
    public description: string = '',
    public save_type: string = 'no save',
    public permits_sr: boolean = false,
    public spell_type: string = 'abjuration',
    public spell_range: string = 'self',
    public views: number = 0,
    public isInFavourites = false,
    public favouritesCount = 0,
    public SpellLevels: SpellLevel[] = [],
    public User = new user.User(),
    public Monsters: Monster[] = [],
  ) {}
}
