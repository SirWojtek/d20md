import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {fromJson} from '../../shared/model/conversions';
import {Feat} from '../../shared/model/feat';
import {GraphQLService} from '../../shared/graphql.service';

import {findFeatsQuery} from '../feat-queries.graphql';
import {UserService} from '../../shared/user/user.service';

interface ISearchFields {
  name?: string;
  phrase?: string;
  feat_type?: string;
}

interface IFeatSearchParams {
  fields: ISearchFields;
  offset: number;
  limit: number;
}

@Injectable()
export class FindFeatService {
  constructor(
    private userService: UserService,
    private graphQLService: GraphQLService,
  ) {}

  public findFeats(
    params: IFeatSearchParams,
  ): Observable<{total: number; filtered: Feat[]}> {
    const fields = params.fields;
    if (fields.phrase && fields.phrase.length < 3) {
      return Observable.of({total: 0, filtered: []});
    }

    return this.userService.getId().flatMap(userId =>
      this.graphQLService
        .query({
          query: findFeatsQuery,
          variables: {
            ...fields,
            feat_type: fields.feat_type || undefined,
            offset: params.offset,
            limit: params.limit,
            userId,
          },
        })
        .map(res => ({
          total: res.data['feats']['count'],
          filtered: fromJson(res.data['feats']['feats'], Feat),
        })),
    );
  }
}
