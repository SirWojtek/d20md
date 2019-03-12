export interface IAttribute {
  value: number;
  modifier: number;
}

export interface IAttributes {
  strength: IAttribute;
  dexterity: IAttribute;
  constitution: IAttribute;
  wisdom: IAttribute;
  intelligence: IAttribute;
  charisma: IAttribute;
}
