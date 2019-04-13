import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {jsonHeader} from '../shared/json-header';
import {fromJson} from '../shared/model/conversions';
import {Feat} from '../shared/model/feat';
import {GraphQLService} from '../shared/graphql.service';

import {UserService} from '../shared/user/user.service';
import {getFeatQuery} from './feat-queries.graphql';

@Injectable()
export class FeatsService {
  private actionUrl: string;

  constructor(
    private http: HttpClient,
    private graphQLService: GraphQLService,
    private userService: UserService,
    @Inject('API_ENDPOINT') apiEndpoint: string,
  ) {
    this.actionUrl = apiEndpoint + '/feat';
  }

  public getFeat(id: number): Observable<Feat> {
    return this.userService.getId().flatMap(userId =>
      this.graphQLService
        .query({
          query: getFeatQuery,
          variables: {id, userId},
        })
        .map(response => fromJson(response.data['feat'], Feat)),
    );
  }

  public updateFeat(feat: Partial<Feat>): Observable<Feat> {
    return (
      this.http
        .post(this.actionUrl + '/update/', JSON.stringify(feat), {
          headers: jsonHeader,
        })
        // FIXME: remove after move to GraphQL mutations
        .flatMap(() => this.graphQLService.resetStore())
        .flatMap(() => this.getFeat(feat.id))
    );
  }

  public addFeat(name: string): Observable<number> {
    return (
      this.http
        .post(this.actionUrl + '/add/', {name}, {headers: jsonHeader})
        // FIXME: remove after move to GraphQL mutations
        .flatMap(() => this.graphQLService.resetStore(), response => response)
        .map(response => response['id'])
        .catch(err => {
          throw err.json();
        })
    );
  }

  public deleteFeat(id: number): Observable<void> {
    return (
      this.http
        .post(this.actionUrl + '/del/', JSON.stringify({id: id}), {
          headers: jsonHeader,
        })
        // FIXME: remove after move to GraphQL mutations
        .flatMap(() => this.graphQLService.resetStore())
    );
  }
}
