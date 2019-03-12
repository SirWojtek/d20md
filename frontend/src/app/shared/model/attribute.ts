import {JsonSerializable} from './conversions';

export class AttributeModifiers {
  constructor(
    public strength = 0,
    public dexterity = 0,
    public constitution = 0,
    public wisdom = 0,
    public intelligence = 0,
    public charisma = 0,
  ) {}
}

export class Attribute implements JsonSerializable {
  public excludedParams = ['mod'];
  public afterConstructionFromJson() {
    // TODO: test if can be removed
    this.mod.strength = this.toMod(this.strength);
    this.mod.dexterity = this.toMod(this.dexterity);
    this.mod.constitution = this.toMod(this.constitution);
    this.mod.wisdom = this.toMod(this.wisdom);
    this.mod.intelligence = this.toMod(this.intelligence);
    this.mod.charisma = this.toMod(this.charisma);
  }

  constructor(
    public mod = new AttributeModifiers(),
    private _strength: number = 10,
    private _dexterity: number = 10,
    private _constitution: number = 10,
    private _wisdom: number = 10,
    private _intelligence: number = 10,
    private _charisma: number = 10,
  ) {}

  get strength() {
    return this._strength;
  }
  set strength(newVal: number) {
    if (this._strength === newVal) {
      return;
    }
    this._strength = newVal;
    this.mod.strength = this.toMod(this._strength);
  }

  get dexterity() {
    return this._dexterity;
  }
  set dexterity(newVal: number) {
    if (this._dexterity === newVal) {
      return;
    }
    this._dexterity = newVal;
    this.mod.dexterity = this.toMod(this._dexterity);
  }

  get constitution() {
    return this._constitution;
  }
  set constitution(newVal: number) {
    if (this._constitution === newVal) {
      return;
    }
    this._constitution = newVal;
    this.mod.constitution = this.toMod(this._constitution);
  }

  get wisdom() {
    return this._wisdom;
  }
  set wisdom(newVal: number) {
    if (this._wisdom === newVal) {
      return;
    }
    this._wisdom = newVal;
    this.mod.wisdom = this.toMod(this._wisdom);
  }

  get intelligence() {
    return this._intelligence;
  }
  set intelligence(newVal: number) {
    if (this._intelligence === newVal) {
      return;
    }
    this._intelligence = newVal;
    this.mod.intelligence = this.toMod(this._intelligence);
  }

  get charisma() {
    return this._charisma;
  }
  set charisma(newVal: number) {
    if (this._charisma === newVal) {
      return;
    }
    this._charisma = newVal;
    this.mod.charisma = this.toMod(this._charisma);
  }

  private toMod(val: number): number {
    return Math.floor((val - 10) / 2);
  }
}
