import { JsonSerializable } from './conversions';
import { Damage } from './damage';

class TotalValues {
  constructor(
    public attack_bonus = 0,
  ) {}
}

export class Attack implements JsonSerializable {
  public excludedParams = [ 'total', 'strength', 'dexterity', 'rangeSubject' ];
  public afterConstructionFromJson() {
    this.Damages.forEach(dmg => dmg.updateRange(this.range));
  }

  constructor(
    public total = new TotalValues(),
    public name: string = '',
    public is_main: boolean = false,
    public attack_type: string = '',
    public _attack_bonus: number = 0,
    public Damages: Damage[] = [],
    public _range = 0,
    public _strength = 0,
    public _dexterity = 0
  ) {}

  updateModifiers(
    strengthModifier: number,
    dexterityModifier: number
  ) {
    this.strength = strengthModifier;
    this.dexterity = dexterityModifier;

    for (const dmg of this.Damages) {
      dmg.updateModifiers(strengthModifier, dexterityModifier);
    }
  }

  get range(): number { return this._range; }
  set range(newVal: number) {
    this._range = newVal;
    this.updateTotal();
  }

  get attack_bonus(): number { return this._attack_bonus; }
  set attack_bonus(newVal: number) {
    this._attack_bonus = newVal;
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

  public getAttackAttribute(): string {
    return this.isRangeAttack() ? 'Dex' : 'Str';
  }

  public getAttackBonus(): number {
    return this.isRangeAttack() ? this.dexterity : this.strength;
  }

  private updateTotal() {
    this.total.attack_bonus = this.getTotalAttackBonus();
  }

  private getTotalAttackBonus(): number {
    return this.attack_bonus + this.getAttackBonus();
  }

  private isRangeAttack(): boolean {
    return this.range > 0;
  }
}
