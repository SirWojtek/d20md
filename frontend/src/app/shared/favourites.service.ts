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
} from './favourites-queries.graphql';

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

export interface FavouriteItem {
  id: number;
  name: string;
}

@Injectable()
export class FavouritesService {
  constructor(private graphQLService: GraphQLService) {}

  getFavourites(
    offset: number,
    limit: number,
    type: EntityType,
  ): Observable<FavouriteItem[]> {
    const query = entityToGetQuery[type];
    return this.graphQLService
      .queryAuth({query, variables: {offset, limit}})
      .map(res =>
        res.data.userFavourites[type + 'Favourites'].map(f => ({
          id: f.id,
          name: f.name,
        })),
      );
  }

  addToFavourites(id: number, type: EntityType): Observable<void> {
    const mutation = entityToAddToFavouriteMutation[type];
    return this.graphQLService
      .mutateAuth({
        mutation,
        variables: {id},
      })
      .map(res => null);
  }

  removeFromFavourites(id: number, type: EntityType): Observable<void> {
    const mutation = entityToRemoveFromFavouriteMutation[type];
    return this.graphQLService
      .mutateAuth({
        mutation,
        variables: {id},
      })
      .map(res => null);
  }
}
