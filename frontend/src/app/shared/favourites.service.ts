import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {EntityType} from './model/entity';
import {GraphQLService} from './graphql.service';
import {
  getMonsterFavouritesQuery,
  getSpellFavouritesQuery,
  getFeatFavouritesQuery,
  addMonsterToFavouritesMutation,
  addSpellToFavouritesMutation,
  addFeatToFavouritesMutation,
  removeMonsterFromFavouritesMutation,
  removeSpellFromFavouritesMutation,
  removeFeatFromFavouritesMutation,
  getFavouritesCountQuery,
} from './favourites-queries.graphql';
import {Monster} from './model/monster';

const entityToAddToFavouriteMutation: {
  [type in keyof typeof EntityType]: string
} = {
  [EntityType.Monster]: addMonsterToFavouritesMutation,
  [EntityType.Spell]: addSpellToFavouritesMutation,
  [EntityType.Feat]: addFeatToFavouritesMutation,
};

const entityToRemoveFromFavouriteMutation: {
  [type in keyof typeof EntityType]: string
} = {
  [EntityType.Monster]: removeMonsterFromFavouritesMutation,
  [EntityType.Spell]: removeSpellFromFavouritesMutation,
  [EntityType.Feat]: removeFeatFromFavouritesMutation,
};

const entityToGetQuery: {[type in keyof typeof EntityType]: string} = {
  [EntityType.Monster]: getMonsterFavouritesQuery,
  [EntityType.Spell]: getSpellFavouritesQuery,
  [EntityType.Feat]: getFeatFavouritesQuery,
};

export type FavouritesCount = {[key in keyof typeof EntityType]: number};

@Injectable()
export class FavouritesService {
  constructor(private graphQLService: GraphQLService) {}

  getMonsterFavourites(
    name: string,
    offset: number,
    limit: number,
  ): Observable<{items: Monster[]; count: number}> {
    const query = entityToGetQuery[EntityType.Monster];
    return this.graphQLService
      .queryAuth({query, variables: {offset, limit}})
      .map(res => ({
        items: res.data.monsterFavourites.monsters,
        count: res.data.monsterFavourites.count,
      }));
  }

  getFavouritesCount(): Observable<FavouritesCount> {
    return this.graphQLService
      .queryAuth({query: getFavouritesCountQuery})
      .map(res => ({
        [EntityType.Monster]: res.data.monsterFavourites.count,
        [EntityType.Spell]: res.data.spellFavourites.count,
        [EntityType.Feat]: res.data.featFavourites.count,
      }));
  }

  addToFavourites(id: number, type: EntityType): Observable<void> {
    const mutation = entityToAddToFavouriteMutation[type];
    return this.graphQLService
      .mutateAuth({
        mutation,
        variables: {id},
      })
      .flatMap(() => this.graphQLService.resetStore());
  }

  removeFromFavourites(id: number, type: EntityType): Observable<void> {
    const mutation = entityToRemoveFromFavouriteMutation[type];
    return this.graphQLService
      .mutateAuth({
        mutation,
        variables: {id},
      })
      .flatMap(() => this.graphQLService.resetStore());
  }
}
