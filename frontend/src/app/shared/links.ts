import {EntityType, IEntity} from './model/entity';

const typeLinks: {[key in keyof typeof EntityType]: string} = {
  [EntityType.Monster]: '/monsters/show',
  [EntityType.Spell]: '/spells/show',
  [EntityType.Feat]: '/feats/show',
};

export function getEntityShowPageLink(entity: IEntity): string {
  return `${typeLinks[entity.type]}/${entity.id}`;
}
