import {JsonSerializable} from './conversions';

export class HitDice implements JsonSerializable {
  public excludedParams = [];

  static getSuggestedHpWithoutCon(hitDices: HitDice[]): number {
    if (!hitDices || !hitDices.length) {
      return 0;
    }
    const firstDice = hitDices[0];
    const result =
      firstDice.hd_type + (firstDice.hd_amount - 1) * firstDice.getAverageHp();

    return hitDices
      .slice(1)
      .reduce(
        (res, dice) => (res += dice.hd_amount * dice.getAverageHp()),
        result,
      );
  }

  static getSuggestedHpConBonus(hitDices: HitDice[], conBonus: number): number {
    if (conBonus === -5) {
      return 0;
    } // NOTE: constructs
    return hitDices.reduce(
      (res, dice) => (res += dice.hd_amount * conBonus),
      0,
    );
  }

  static getSuggestedHp(hitDices: HitDice[], conBonus: number): number {
    return (
      HitDice.getSuggestedHpWithoutCon(hitDices) +
      HitDice.getSuggestedHpConBonus(hitDices, conBonus)
    );
  }

  static countHd(hitDices: HitDice[]): number {
    return hitDices.reduce((res, hd) => (res += hd.hd_amount), 0);
  }

  public afterConstructionFromJson() {}

  constructor(
    public hd_type: number = 4,
    public hd_amount: number = 1,
    public description: string = '',
  ) {}

  public getAverageHp(): number {
    return (this.hd_type + 1) / 2;
  }
}
