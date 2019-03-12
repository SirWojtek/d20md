import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {GraphQLService} from '../../shared/graphql.service';
import {quickSearchQuery} from './quick-search-query.graphql';

export interface IQuickSearchResults {
  monsters: {
    id: number;
    name: string;
  }[];
  spells: {
    id: number;
    name: string;
  }[];
  feats: {
    id: number;
    name: string;
  }[];
}

@Injectable()
export class QuickSearchService {
  constructor(private graphQLService: GraphQLService) {}

  search(query: string): Observable<IQuickSearchResults> {
    return this.graphQLService
      .query({
        query: quickSearchQuery,
        variables: {query},
      })
      .map(r => ({
        monsters: r.data.monsters.monsters,
        spells: r.data.spells.spells,
        feats: r.data.feats.feats,
      }));
  }
}
