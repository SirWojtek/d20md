import { JsonSerializable } from './conversions';

export class Image implements JsonSerializable {
  public excludedParams = [];
  public afterConstructionFromJson() {}

  constructor(
    public path: string = ''
  ) {}
}
