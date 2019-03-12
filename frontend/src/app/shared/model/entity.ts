export enum EntityType {
  Monster = 'Monster',
  Spell = 'Spell',
  Feat = 'Feat',
}

export interface IEntity {
  id: number;
  name: string;
  type: EntityType;
}
