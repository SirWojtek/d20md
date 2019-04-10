import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';

import {Monster} from '../../shared/model/monster';
import {fromJson} from '../../shared/model/conversions';
import {GraphQLService} from '../../shared/graphql.service';

import {findMonstersQuery} from '../monster-queries.graphql';
import {UserService} from '../../shared/user/user.service';

export interface IFindMonsterParams {
  fields: any;
  environment_tags: any[];
  offset: number;
  limit: number;
  asc: string[];
  desc: string[];
  userId?: number;
}

@Injectable()
export class FindMonsterService {
  constructor(private graphQLService: GraphQLService) {}

  public findMonsters(
    params: IFindMonsterParams,
  ): Observable<{count: number; rows: Monster[]}> {
    const variables = _.omit(params, 'fields');

    for (const field in params.fields) {
      if (
        params.fields[field].min !== undefined &&
        params.fields[field].max !== undefined
      ) {
        variables['min_' + field] = params.fields[field].min;
        variables['max_' + field] = params.fields[field].max;
      } else {
        variables[field] = params.fields[field];
      }
    }

    return this.graphQLService
      .query({
        query: findMonstersQuery,
        variables,
      })
      .map(res => ({
        count: res.data.monsters.count,
        rows: fromJson(res.data.monsters.monsters, Monster),
      }));
  }
}
