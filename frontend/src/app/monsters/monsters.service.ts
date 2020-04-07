import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';

import { jsonHeader } from '../shared/json-header';
import { fromJson, toJson } from '../shared/model/conversions';
import { Monster } from '../shared/model/monster';
import { Image } from '../shared/model/image';
import { UploadService } from '../shared/upload.service';
import { GraphQLService } from '../shared/graphql.service';

import { getQueryMap } from './monster-queries.graphql';
import { UserService } from '../shared/user/user.service';

@Injectable()
export class MonstersService {
  private actionUrl: string;

  private hasChanged = new Subject<void>();
  private hasChangedObservable = this.hasChanged.asObservable();

  constructor(
    private http: HttpClient,
    private graphQLService: GraphQLService,
    @Inject('API_ENDPOINT') apiEndpoint: string,
    private uploadService: UploadService,
    private userService: UserService
  ) {
    this.actionUrl = apiEndpoint + '/monsters';
  }

  getMonster(id: number, queryType: string): Observable<Monster> {
    const query = getQueryMap[queryType] || getQueryMap['basic'];
    return this.userService
      .getId()
      .flatMap(userId =>
        this.graphQLService
          .query({ query, variables: { id, userId } })
          .map(res => fromJson(res.data['monster'], Monster))
      );
  }

  updateMonster(
    monster: Partial<Monster>,
    queryType: string
  ): Observable<Monster> {
    return (
      this.http
        .post(this.actionUrl + '/update/', JSON.stringify(monster), {
          headers: jsonHeader
        })
        // FIXME: remove after move to GraphQL mutations
        .flatMap(() =>
          this.graphQLService.resetStore().then(() => {
            // NOTE: because other parameters relly on Attributes
            if (monster.Attribute) {
              this.hasChanged.next();
            }
          })
        )
        .flatMap(() => this.getMonster(monster.id, queryType))
    );
  }

  getHasChangedObservable(): Observable<void> {
    return this.hasChangedObservable;
  }

  addImage(id: number, image: File): Observable<Image> {
    return this.uploadService
      .makeFileRequest(this.actionUrl + '/addImage?id=' + id, [image])
      .map((response: any) => fromJson(response, Image));
  }

  addMonster(newMonster: Monster): Observable<number | {}> {
    return (
      this.http
        .post(this.actionUrl + '/add/', toJson(newMonster), {
          headers: jsonHeader
        })
        // FIXME: remove after move to GraphQL mutations
        .flatMap(
          () => this.graphQLService.resetStore(),
          result => result
        )
        .map(response => fromJson(response, Monster))
        .map((monster: Monster) => monster.id)
        .catch(err => {
          throw err.json();
        })
    );
  }

  deleteMonster(id: number): Observable<void> {
    return (
      this.http
        .post(this.actionUrl + '/del/', JSON.stringify({ id: id }), {
          headers: jsonHeader
        })
        // FIXME: remove after move to GraphQL mutations
        .flatMap(() => this.graphQLService.resetStore())
    );
  }
}
