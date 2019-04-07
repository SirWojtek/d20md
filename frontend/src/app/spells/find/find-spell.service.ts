import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';

import {Spell} from '../../shared/model/spell';
import {fromJson} from '../../shared/model/conversions';
import {GraphQLService} from '../../shared/graphql.service';

import {findSpellsQuery} from '../spell-queries.graphql';
import {UserService} from '../../shared/user/user.service';

interface ISearchFields {
  [field: string]: string | {min: number; max: number};
}

interface ISpellSearchParams {
  fields: ISearchFields;
  offset: number;
  limit: number;
  asc: string[];
  desc: string[];
}

@Injectable()
export class FindSpellService {
  constructor(
    private userService: UserService,
    private graphQLService: GraphQLService,
  ) {}

  public findSpells(
    params: ISpellSearchParams,
  ): Observable<{total: number; filtered: Spell[]}> {
    const variables = _.omit(params, 'fields');

    Object.keys(params.fields).forEach(field => {
      if (typeof params.fields[field] === 'string') {
        variables[field] = params.fields[field] as string;
      } else {
        const fieldDef = params.fields[field] as {min: number; max: number};
        variables['min_' + field] = String(fieldDef.min);
        variables['max_' + field] = String(fieldDef.max);
      }
    });

    return this.userService.getId().flatMap(userId =>
      this.graphQLService
        .query({
          query: findSpellsQuery,
          variables: {...variables, userId},
        })
        .map(res => ({
          total: res.data.spells.count,
          filtered: fromJson(res.data.spells.spells, Spell),
        })),
    );
  }
}
