import { JsonSerializable } from './conversions';

export class Speed implements JsonSerializable {
  public excludedParams = [];
  public afterConstructionFromJson() {}

  constructor(
    public fly: number = 0,
    public swim: number = 0,
    public climb: number = 0,
    public land: number = 0,
    public burrow: number = 0,
  ) {}
}
