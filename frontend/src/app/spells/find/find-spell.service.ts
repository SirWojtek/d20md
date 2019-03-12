import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Spell } from '../../shared/model/spell';
import { fromJson } from '../../shared/model/conversions';
import { GraphQLService } from '../../shared/graphql.service';

import { findSpellsQuery } from '../spell-queries.graphql';

interface ISearchFields {
  [field: string]: string | { min: number, max: number };
}

@Injectable()
export class FindSpellService {
  constructor(private graphQLService: GraphQLService) {}

  public findSpells(fields: ISearchFields, offset: number, limit: number,
    asc: string[] = [], desc: string[] = []
  ): Observable<{ total: number, filtered: Spell[] }> {
    const params = { offset, limit, asc, desc };

    Object.keys(fields).forEach(field => {
      if (typeof fields[field] === 'string') {
        params[field] = fields[field] as string;
      } else {
        const fieldDef = fields[field] as { min: number, max: number };
        params['min_' + field] = String(fieldDef.min);
        params['max_' + field] = String(fieldDef.max);
      }
    });

    return this.graphQLService.query({
      query: findSpellsQuery,
      variables: params
    }).map(res => ({
      total: res.data.spells.count,
      filtered: fromJson(res.data.spells.spells, Spell)
    }));
  }
}
