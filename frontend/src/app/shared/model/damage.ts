import { JsonSerializable } from './conversions';

class Total {
  constructor(
    public damage_bonus: number = 0
  ) {}
}

export class Damage implements JsonSerializable {
  public excludedParams = [
    'total', 'strengthSub', 'dexteritySub', 'rangeSub',
    'strength', 'dexterity', 'range' ];
  public afterConstructionFromJson() {}

  constructor(
    public dd_type: number = 2,
    public dd_amount: number = 1,
    public _damage_bonus: number = 0,
    public total = new Total(),
    public damage_type: string = 'slashing',
    public critical: string = '',
    public description: string = '',
    public _strength = 0,
    public _dexterity = 0,
    public _range: number = 0
  ) {}

  updateModifiers(strengthModifier: number, dexterityModifier: number) {
    this.strength = strengthModifier;
    this.dexterity = dexterityModifier;
  }

  updateRange(range: number) {
    this.range = range;
  }

  get damage_bonus(): number { return this._damage_bonus; }
  set damage_bonus(newVal: number) {
    this._damage_bonus = newVal;
    this.updateTotal();
  }

  get strength(): number { return this._strength; }
  set strength(newVal: number) {
    this._strength = newVal;
    this.updateTotal();
  }

  get dexterity(): number { return this._dexterity; }
  set dexterity(newVal: number) {
    this._dexterity = newVal;
    this.updateTotal();
  }

  get range(): number { return this._range; }
  set range(newVal: number) {
    this._range = newVal;
    this.updateTotal();
  }

  public getDamageBonus(): number {
    return this.isRangeAttack() ? this.getRangeDamageBonus() : this.strength;
  }

  public toString(typeIinfo = false): string {
    let res = `${this.dd_amount}k${this.dd_type}`;
    const dmgBonus = this.getTotalDamageBonus();
    res += dmgBonus < 0 ? `-${dmgBonus}` : `+${dmgBonus}`;
    res += `/${this.critical}`;
    if (typeIinfo) {
      res += ` (${this.damage_type})`;
    }
    return res;
  }

  private updateTotal() {
    this.total.damage_bonus = this.getTotalDamageBonus();
  }

  private getTotalDamageBonus(): number {
    return this.damage_bonus + this.getDamageBonus();
  }

  private isRangeAttack(): boolean {
    return this.range > 0;
  }

  private getRangeDamageBonus(): number {
    return this.strength < 0 ? this.strength : 0;
  }
}

