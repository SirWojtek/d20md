import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {jsonHeader} from '../shared/json-header';
import {fromJson} from '../shared/model/conversions';
import {Spell} from '../shared/model/spell';
import {GraphQLService} from '../shared/graphql.service';

import {getSpellQuery} from './spell-queries.graphql';
import {UserService} from '../shared/user/user.service';

@Injectable()
export class SpellsService {
  private actionUrl: string;

  constructor(
    private http: HttpClient,
    private graphQLService: GraphQLService,
    private userService: UserService,
    @Inject('API_ENDPOINT') apiEndpoint: string,
  ) {
    this.actionUrl = apiEndpoint + '/spells';
  }

  public getSpell(id: number): Observable<Spell> {
    return this.userService.getId().flatMap(userId =>
      this.graphQLService
        .query({
          query: getSpellQuery,
          variables: {id, userId},
        })
        .map(response => fromJson(response.data['spell'], Spell)),
    );
  }

  public updateSpell(spell: Partial<Spell>): Observable<Spell> {
    return (
      this.http
        .post(this.actionUrl + '/update/', JSON.stringify(spell), {
          headers: jsonHeader,
        })
        // FIXME: remove after move to GraphQL mutations
        .flatMap(() => this.graphQLService.resetStore())
        .flatMap(() => this.getSpell(spell.id))
    );
  }

  public addSpell(name: string): Observable<number> {
    return (
      this.http
        .post(this.actionUrl + '/add/', {name}, {headers: jsonHeader})
        // FIXME: remove after move to GraphQL mutations
        .flatMap(() => this.graphQLService.resetStore(), response => response)
        .map(response => response['id'])
        .catch(err => {
          throw err;
        })
    );
  }

  public deleteSpell(id: number): Observable<void> {
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
