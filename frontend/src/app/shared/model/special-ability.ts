import { JsonSerializable } from './conversions';

export class SpecialAbility implements JsonSerializable {
  public excludedParams = [];
  public afterConstructionFromJson() {}

  constructor(
    public type: string = 'extraordinary',
    public name: string = '',
    public description: string = '',
  ) {}
}
