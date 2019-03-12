import { JsonSerializable } from './conversions';

export class User implements JsonSerializable {
  public excludedParams = [ 'usertype', 'createdAt' ];
  public afterConstructionFromJson() {}

  constructor(
    public id: number = -1,
    public email: string = '',
    public password: string = '',
    public usertype: string = 'user',
  ) {}
}
