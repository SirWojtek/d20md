import { JsonSerializable } from './conversions';

class SaveModifiers {
  constructor(
    public will = 0,
    public reflex = 0,
    public fortitude = 0
  ) {}
}

export class Save implements JsonSerializable {
  excludedParams = [ 'attr', 'total' ];
  afterConstructionFromJson() {}

  constructor(
    public attr = new SaveModifiers(),
    public total = new SaveModifiers(),
    public _will: number = 3,
    public _reflex: number = 3,
    public _fortitude: number = 3
  ) {}

  public get will(): number { return this._will; }
  public set will(newValue: number) {
    this._will = newValue;
    this.total.will = newValue + this.attr.will;
  }
  public get reflex(): number { return this._reflex; }
  public set reflex(newValue: number) {
    this._reflex = newValue;
    this.total.reflex = newValue + this.attr.reflex;
  }
  public get fortitude(): number { return this._fortitude; }
  public set fortitude(newValue: number) {
    this._fortitude = newValue;
    this.total.fortitude = newValue + this.attr.fortitude;
  }

  updateModifiers(
    willAttrModifier: number,
    reflexAttrModifier: number,
    fortitudeAttrModifier: number
  ) {
    this.updateSave('will', willAttrModifier);
    this.updateSave('reflex', reflexAttrModifier);
    this.updateSave('fortitude', fortitudeAttrModifier);
  }

  private updateSave(saveName: string, attrValue: number) {
    this.attr[saveName] = attrValue;
    this.total[saveName] = this[saveName] + attrValue;
  }
}
