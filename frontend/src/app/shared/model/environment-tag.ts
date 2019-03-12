import { JsonSerializable } from './conversions';

export class EnvironmentTag implements JsonSerializable {
  public excludedParams = [];
  public afterConstructionFromJson() {}

  constructor(
    public type: string = 'any'
  ) {}
}
