import {EntityType} from './model/entity';

const typeColors: {[key in keyof typeof EntityType]: string} = {
  [EntityType.Monster]: '#3062FF',
  [EntityType.Spell]: '#BC26FF',
  [EntityType.Feat]: '#0CBD7D',
};

export function getEntityColor(type: EntityType): string {
  return typeColors[type];
}
