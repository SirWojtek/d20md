import { JsonSerializable } from './conversions';

class ArmorSummary {
  constructor(
    public touch: number = 0,
    public flat_footed: number = 0,
    // TODO: remove (monster.armorSum field present
    public total: number = 0
  ) {}
}

export class Armor implements JsonSerializable {
  public excludedParams = ['summary', 'armorBase', 'dexterity'];
  public afterConstructionFromJson() {}

  constructor(
    public summary  = new ArmorSummary(),
    public armorBase = 10,
    public _armor: number = 0,
    public _shield: number = 0,
    public _size: number = 0,
    public _enhancement: number = 0,
    public _deflection: number = 0,
    public _natural: number = 0,
    public _dexterity: number = 0
  ) {}

  updateModifiers(dexterityModifier: number) {
    this.dexterity = dexterityModifier;
  }

  get armor(): number { return this._armor; }
  set armor(newVal: number) {
    this._armor = newVal;
    this.updateSummary();
  }
  get shield(): number { return this._shield; }
  set shield(newVal: number) {
    this._shield = newVal;
    this.updateSummary();
  }
  get dexterity(): number { return this._dexterity; }
  set dexterity(newVal: number) {
    this._dexterity = newVal;
    this.updateSummary();
  }
  get size(): number { return this._size; }
  set size(newVal: number) {
    this._size = newVal;
    this.updateSummary();
  }
  get enhancement(): number { return this._enhancement; }
  set enhancement(newVal: number) {
    this._enhancement = newVal;
    this.updateSummary();
  }
  get deflection(): number { return this._deflection; }
  set deflection(newVal: number) {
    this._deflection = newVal;
    this.updateSummary();
  }
  get natural(): number { return this._natural; }
  set natural(newVal: number) {
    this._natural = newVal;
    this.updateSummary();
  }

  private updateSummary() {
    this.summary.touch =
      this.armorBase + this.dexterity + this.size + this.deflection;
    this.summary.flat_footed =
      this.armorBase + this.armor + this.shield +
      this.size + this.enhancement + this.deflection +
      this.natural;
    this.summary.total = this.dexterity + this.summary.flat_footed;  // TODO: add dex
  }
}
