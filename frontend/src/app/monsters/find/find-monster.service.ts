import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Monster } from '../../shared/model/monster';
import { fromJson } from '../../shared/model/conversions';
import { GraphQLService } from '../../shared/graphql.service';

import { findMonstersQuery } from '../monster-queries.graphql';

@Injectable()
export class FindMonsterService {
  constructor(private graphQLService: GraphQLService) {}

  public findMonsters(fields: any, tags: any, offset: number, limit: number,
    sortAsc: string[] = [], sortDesc: string[] = []
  ): Observable<{ count: number, rows: Monster[] }> {
    const params = {
      ...tags,
      offset,
      limit,
      asc: sortAsc,
      desc: sortDesc,
    };

    for (const field in fields) {
      if (fields[field].min !== undefined && fields[field].max !== undefined) {
        params['min_' + field] = fields[field].min;
        params['max_' + field] = fields[field].max;
      } else {
        params[field] = fields[field];
      }
    }

    return this.graphQLService.query({
      query: findMonstersQuery,
      variables: params
    }).map(res => ({
      count: res.data.monsters.count,
      rows: fromJson(res.data.monsters.monsters, Monster)
    }));
  }
}
