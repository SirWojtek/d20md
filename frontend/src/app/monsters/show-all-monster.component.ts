import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

import { Monster } from '../shared/model/monster';
import { MonstersService } from './monsters.service';

interface IPanelHiddenState {
  general: boolean;
  hitDices: boolean;
  save: boolean;
  attribute: boolean;
  armor: boolean;
  attacks: boolean;
  speed: boolean;
  skill: boolean;
  description: boolean;
  spells: boolean;
  feats: boolean;
  specialAbilities: boolean;
}

@Component({
  templateUrl: './show-all-monster.component.html',
  styleUrls: ['./show-all-monster.component.scss']
})
export class ShowAllMonsterComponent {
  monsterOb: Observable<Monster | undefined> = this.activatedRoute.params.pipe(
    switchMap(params => this.monstersService.getMonster(+params['id'], 'all'))
  );

  panelHiddenState: IPanelHiddenState = {
    general: false,
    hitDices: false,
    save: false,
    attribute: false,
    armor: false,
    attacks: false,
    speed: false,
    skill: false,
    description: false,
    spells: false,
    feats: false,
    specialAbilities: false
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private monstersService: MonstersService
  ) {}

  onResetView() {
    Object.keys(this.panelHiddenState).forEach(
      key => (this.panelHiddenState[key] = false)
    );
  }
}
