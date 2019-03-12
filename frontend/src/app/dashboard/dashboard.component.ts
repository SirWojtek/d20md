import {Component} from '@angular/core';
import {IEntity, EntityType} from '../shared/model/entity';
import {Observable} from 'rxjs/Observable';
import {
  DashboardService,
  IHistoryResults,
  IPopularResults,
  ILastUpdatedResults,
} from './dashboard.service';
import {reverse, sortBy} from 'lodash';

interface IHistoryItem extends IEntity {
  visitedAt: Date;
}

interface IPopularItem extends IEntity {
  views: number;
}
interface ILastUpdatedItem extends IEntity {
  updatedAt: Date;
}

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  historyObs: Observable<
    IHistoryItem[]
  > = this.dashboardService
    .getUserHistory()
    .map(items => this.toHistoryData(items));

  popularObs: Observable<
    IPopularItem[]
  > = this.dashboardService
    .getMostPopular()
    .map(items => this.toPopularData(items));

  lastUpdatedObs: Observable<
    ILastUpdatedItem[]
  > = this.dashboardService
    .getLastUpdated()
    .map(items => this.toLastUpdatedData(items));

  constructor(private dashboardService: DashboardService) {}

  private toHistoryData(items: IHistoryResults): IHistoryItem[] {
    const entities: IHistoryItem[] = [
      ...items.monsters.map(m => ({...m, type: EntityType.Monster})),
      ...items.spells.map(s => ({...s, type: EntityType.Spell})),
      ...items.feats.map(f => ({...f, type: EntityType.Feat})),
    ];

    return reverse(sortBy(entities, ['visitedAt']));
  }

  private toPopularData(popularItems: IPopularResults): IPopularItem[] {
    const allItems: IPopularItem[] = [
      ...popularItems.monsters.map(m => ({...m, type: EntityType.Monster})),
      ...popularItems.spells.map(s => ({...s, type: EntityType.Spell})),
      ...popularItems.feats.map(f => ({...f, type: EntityType.Feat})),
    ];

    return reverse(sortBy(allItems, ['views']));
  }

  private toLastUpdatedData(
    lastUpdated: ILastUpdatedResults,
  ): ILastUpdatedItem[] {
    const allItems: ILastUpdatedItem[] = [
      ...lastUpdated.monsters.map(m => ({...m, type: EntityType.Monster})),
      ...lastUpdated.spells.map(s => ({...s, type: EntityType.Spell})),
      ...lastUpdated.feats.map(f => ({...f, type: EntityType.Feat})),
    ];

    return reverse(sortBy(allItems, ['updatedAt']));
  }
}
