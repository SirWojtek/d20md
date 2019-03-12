import { Attack } from './attack';
import { JsonSerializable } from './conversions';

export class AttackGroup implements JsonSerializable {
  public excludedParams = [];
  public afterConstructionFromJson() {}

  constructor(
    public Attacks: Attack[] = []
  ) {}
}

