import {Component, Input, OnInit} from '@angular/core';

import {HitDice} from '../../../shared/model/hit-dice';
import {TableProperties} from '../../../shared/elements/editor-table/editor-table.component';

import {MonstersService} from '../../monsters.service';
import {Monster} from '../../../shared/model/monster';
import {Observable} from 'rxjs/Observable';
import {toJson} from '../../../shared/model/conversions';

@Component({
  selector: 'd20md-hit-dices-panel',
  templateUrl: './hit-dices-panel.component.html',
})
export class HitDicesPanelComponent implements OnInit {
  @Input()
  monsterId: number;
  @Input()
  canModify: boolean;

  monsterObs: Observable<Monster>;

  hitDiceProperties = [
    new TableProperties('hd_amount', 'Hit dice amount', true),
    new TableProperties('hd_type', 'Hit dice type', true),
    new TableProperties('description', 'Description'),
  ];

  constructor(private monstersService: MonstersService) {
    this.monstersService
      .getHasChangedObservable()
      .subscribe(() => this.ngOnInit());
  }

  ngOnInit() {
    this.monsterObs = this.monstersService.getMonster(this.monsterId, 'basic');
  }

  getSuggestedHp(monster: Monster): number {
    const hpWithoutCon = HitDice.getSuggestedHpWithoutCon(monster.HitDices);
    const hpConBonus = HitDice.getSuggestedHpConBonus(
      monster.HitDices,
      monster.Attribute.mod.constitution,
    );
    const total = hpWithoutCon + hpConBonus;
    return total;
  }

  onTableEditorSave(hitDices: HitDice[]) {
    this.monsterObs = this.monstersService.updateMonster(
      {
        id: this.monsterId,
        HitDices: hitDices,
      },
      'basic',
    );
  }

  onGenerate(monster: Monster) {
    this.monsterObs = this.monstersService.updateMonster(
      toJson(monster),
      'basic',
    );
  }

  onHpSave(newHp: number) {
    this.monsterObs = this.monstersService.updateMonster(
      {
        id: this.monsterId,
        hp: newHp,
      },
      'basic',
    );
  }
}
