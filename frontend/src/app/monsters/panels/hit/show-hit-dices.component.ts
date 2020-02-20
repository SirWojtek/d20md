import { Component, Input, OnChanges } from '@angular/core';
import * as _ from 'lodash';
import { HitDice } from '../../../shared/model/hit-dice';
import { chromaColor } from '../../../shared/chroma-color';

@Component({
  selector: 'd20md-show-hit-dices',
  templateUrl: './show-hit-dices.component.html',
  styleUrls: ['./show-hit-dices.component.scss']
})
export class ShowHitDicesComponent implements OnChanges {
  @Input()
  hitDices: HitDice[] = [];
  @Input()
  hp: number;
  @Input()
  conModifier: number;
  @Input()
  viewOnly = false;

  chopedHitDices = [];

  private hdColor = chromaColor([1, 5, 10, 25, 50]);
  private hpColor = chromaColor([1, 20, 100, 500, 1000]);

  ngOnChanges(changes) {
    if (!changes['hitDices']) {
      return;
    }

    this.chopedHitDices = _.chunk(this.hitDices, 2);
  }

  public getDiceColor(hitDice: HitDice) {
    return this.hdColor(hitDice.hd_amount);
  }

  public getHpColor() {
    return this.hpColor(this.hp);
  }

  public getHpTooltipText(): string {
    const hpWithoutCon = HitDice.getSuggestedHpWithoutCon(this.hitDices);
    const hpConBonus = HitDice.getSuggestedHpConBonus(
      this.hitDices,
      this.conModifier
    );
    const total = hpWithoutCon + hpConBonus;

    return `Suggested HP: ${total}
    (${hpWithoutCon}+${hpConBonus} (Con))`;
  }
}
