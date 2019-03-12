import { JsonSerializable } from './conversions';

export class SpellLevel implements JsonSerializable {
  public excludedParams = [];
  public afterConstructionFromJson() {}

  constructor(
    public level: number = 0,
    public class_name: string = 'wizard'
  ) {}
}
