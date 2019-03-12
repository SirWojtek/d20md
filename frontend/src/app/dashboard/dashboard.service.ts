import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/finally';

import {GraphQLService} from '../shared/graphql.service';
import {
  lastUpdatedQuery,
  userMonstersQuery,
  userSpellsQuery,
  userFeatsQuery,
  userEntitiesCountQuery,
  popularQuery,
  userHistoryQuery,
} from './dashboard-queries.graphql';
import {Monster} from '../shared/model/monster';
import {fromJson} from '../shared/model/conversions';
import {UserService} from '../shared/user/user.service';
import {Spell} from '../shared/model/spell';
import {Feat} from '../shared/model/feat';
import {EntityType} from '../shared/model/entity';
import {MonstersService} from '../monsters/monsters.service';
import {SpellsService} from '../spells/spells.service';
import {FeatsService} from '../feats/feats.service';

export interface ILastUpdatedResults {
  monsters: {
    id: number;
    name: string;
    updatedAt: Date;
  }[];
  spells: {
    id: number;
    name: string;
    updatedAt: Date;
  }[];
  feats: {
    id: number;
    name: string;
    updatedAt: Date;
  }[];
}

export interface IPopularResults {
  monsters: {
    id: number;
    name: string;
    views: number;
  }[];
  spells: {
    id: number;
    name: string;
    views: number;
  }[];
  feats: {
    id: number;
    name: string;
    views: number;
  }[];
}

export interface IHistoryResults {
  monsters: {
    id: number;
    name: string;
    visitedAt: Date;
  }[];
  spells: {
    id: number;
    name: string;
    visitedAt: Date;
  }[];
  feats: {
    id: number;
    name: string;
    visitedAt: Date;
  }[];
}

@Injectable()
export class DashboardService {
  private needsUpdateSubject = new BehaviorSubject<void>(null);
  private needsUpdateObs = this.needsUpdateSubject.asObservable();

  constructor(
    private graphQLService: GraphQLService,
    private userService: UserService,
    private monstersService: MonstersService,
    private spellsService: SpellsService,
    private featsService: FeatsService,
  ) {}

  getUserMonsters(
    name: string,
    offset: number,
    limit: number,
    asc: string[],
    desc: string[],
  ): Observable<{count: number; rows: Monster[]}> {
    return this.needsUpdateObs.flatMap(() =>
      this.getUserId().flatMap(userId => {
        const variables = {
          name,
          userId,
          offset,
          limit,
          asc,
          desc,
        };
        return this.graphQLService
          .query({
            query: userMonstersQuery,
            variables,
          })
          .map(res => ({
            count: res.data.monsters.count,
            rows: fromJson(res.data.monsters.monsters, Monster),
          }));
      }),
    );
  }

  getUserSpells(
    name: string,
    type: string,
    offset: number,
    limit: number,
    asc: string[],
    desc: string[],
  ): Observable<{count: number; rows: Spell[]}> {
    return this.needsUpdateObs.flatMap(() =>
      this.getUserId().flatMap(userId => {
        const variables = {
          name,
          type,
          userId,
          offset,
          limit,
          asc,
          desc,
        };
        return this.graphQLService
          .query({
            query: userSpellsQuery,
            variables,
          })
          .map(res => ({
            count: res.data.spells.count,
            rows: fromJson(res.data.spells.spells, Spell),
          }));
      }),
    );
  }

  getUserFeats(
    name: string,
    type: string,
    offset: number,
    limit: number,
    asc: string[],
    desc: string[],
  ): Observable<{count: number; rows: Feat[]}> {
    return this.needsUpdateObs.flatMap(() =>
      this.getUserId().flatMap(userId => {
        const variables = {
          name,
          type,
          userId,
          offset,
          limit,
          asc,
          desc,
        };
        return this.graphQLService
          .query({
            query: userFeatsQuery,
            variables,
          })
          .map(res => ({
            count: res.data.feats.count,
            rows: fromJson(res.data.feats.feats, Feat),
          }));
      }),
    );
  }

  getUserHistory(): Observable<IHistoryResults> {
    return this.needsUpdateObs.flatMap(() =>
      this.graphQLService
        .queryAuth({
          query: userHistoryQuery,
        })
        .map(r => ({
          monsters: r.data.userHistory.MonsterViewLogs.map(m => ({
            ...m,
            visitedAt: new Date(m.MonsterViewLog.updatedAt),
          })),
          spells: r.data.userHistory.SpellViewLogs.map(s => ({
            ...s,
            visitedAt: new Date(s.SpellViewLog.updatedAt),
          })),
          feats: r.data.userHistory.FeatViewLogs.map(f => ({
            ...f,
            visitedAt: new Date(f.FeatViewLog.updatedAt),
          })),
        })),
    );
  }

  getLastUpdated(): Observable<ILastUpdatedResults> {
    return this.needsUpdateObs.flatMap(() =>
      this.graphQLService
        .query({
          query: lastUpdatedQuery,
        })
        .map(r => ({
          monsters: r.data.monsters.monsters.map(m => ({
            ...m,
            updatedAt: new Date(m.updatedAt),
          })),
          spells: r.data.spells.spells.map(s => ({
            ...s,
            updatedAt: new Date(s.updatedAt),
          })),
          feats: r.data.feats.feats.map(f => ({
            ...f,
            updatedAt: new Date(f.updatedAt),
          })),
        })),
    );
  }

  getMostPopular(): Observable<IPopularResults> {
    return this.needsUpdateObs.flatMap(() =>
      this.graphQLService.query({query: popularQuery}).map(r => ({
        monsters: r.data.monsters.monsters,
        spells: r.data.spells.spells,
        feats: r.data.feats.feats,
      })),
    );
  }

  getEntitiesCount(): Observable<{[type in keyof typeof EntityType]: number}> {
    return this.needsUpdateObs.flatMap(() =>
      this.getUserId()
        .flatMap(userId =>
          this.graphQLService.query({
            query: userEntitiesCountQuery,
            variables: {userId},
          }),
        )
        .map(r => ({
          [EntityType.Monster]: r.data.monsters.count,
          [EntityType.Spell]: r.data.spells.count,
          [EntityType.Feat]: r.data.feats.count,
        })),
    );
  }

  deleteMonster(id: number): Observable<void> {
    return this.monstersService
      .deleteMonster(id)
      .finally(() => this.needsUpdateSubject.next(null));
  }

  deleteSpell(id: number): Observable<void> {
    return this.spellsService
      .deleteSpell(id)
      .finally(() => this.needsUpdateSubject.next(null));
  }

  deleteFeat(id: number): Observable<void> {
    return this.featsService
      .deleteFeat(id)
      .finally(() => this.needsUpdateSubject.next(null));
  }

  private getUserId(): Observable<string> {
    return this.userService.getId().filter(id => !!id);
  }
}
