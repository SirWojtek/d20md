import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { GraphQLService } from './graphql.service';

import { enumQueryMap } from './enum-queries.graphql';

@Injectable()
export class EnumService {

  constructor(private graphQLService: GraphQLService) {}

  public getSpellLevels(): Observable<string[]> {
    return this.graphQLQuery('spell_levels');
  }

  public getSpellSaves(): Observable<string[]> {
    return this.graphQLQuery('spell_saves');
  }

  public getSpellTypes(): Observable<string[]> {
    return this.graphQLQuery('spell_types');
  }

  public getSpellRanges(): Observable<string[]> {
    return this.graphQLQuery('spell_ranges');
  }

  public getFeatTypes(): Observable<string[]> {
    return this.graphQLQuery('feat_types');
  }

  public getAttackTypes(): Observable<string[]> {
    return this.graphQLQuery('attack_types');
  }

  public getDices(): Observable<number[]> {
    return this.graphQLQuery('dices');
  }

  public getDamageTypes(): Observable<string[]> {
    return this.graphQLQuery('damage_types');
  }

  public getSpecialTypes(): Observable<string[]> {
    return this.graphQLQuery('special_types');
  }

  public getMonsterTypes(): Observable<string[]> {
    return this.graphQLQuery('monster_types');
  }

  public getSizes(): Observable<string[]> {
    return this.graphQLQuery('sizes');
  }

  public getEnvironmentTags(): Observable<string[]> {
    return this.graphQLQuery('environment_tags');
  }

  private graphQLQuery(queryName: string): Observable<any[]> {
    return this.graphQLService.query({ query: enumQueryMap[queryName] })
      .map(res => res.data[queryName]);
  }
}

