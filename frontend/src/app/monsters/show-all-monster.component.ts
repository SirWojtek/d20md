import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

import { Monster } from '../shared/model/monster';
import { MonstersService } from './monsters.service';

@Component({
  templateUrl: './show-all-monster.component.html',
  styleUrls: ['./show-all-monster.component.scss']
})
export class ShowAllMonsterComponent {
  monsterOb: Observable<Monster | undefined> = this.activatedRoute.params.pipe(
    switchMap(params => this.monstersService.getMonster(+params['id'], 'all'))
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private monstersService: MonstersService
  ) {}
}
