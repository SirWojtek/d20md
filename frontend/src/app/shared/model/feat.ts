import {Monster} from './monster';
import * as user from './user';
import {JsonSerializable} from './conversions';

export class Feat implements JsonSerializable {
  public excludedParams = [];
  public afterConstructionFromJson() {}

  constructor(
    public id: number = -1,
    public name: string = '',
    public feat_type: string = 'general',
    public benefit: string = '',
    public normal: string = '',
    public special: string = '',
    public views: number = 0,
    public isInFavourites = false,
    public favouritesCount = 0,
    public Prerequisite: Feat[] = [],
    public User: user.User = new user.User(),
    public Monsters: Monster[] = [],
  ) {}
}
