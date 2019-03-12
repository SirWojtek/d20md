import { Component, Input } from '@angular/core';

import { HitDice } from '../../../shared/model/hit-dice';

@Component({
  selector: 'd20md-hd-element',
  template: `
  <div>
    <img src="assets/img/dice-12.svg" title="Hit Dices" height="32"/>
    <span>{{ getHd() }}</span>
  </div>
  <div>
    <img src="assets/img/hp.svg" title="Hit Points" height="32"/>
    <span>{{ hp }}</span>
  </div>
  `,
  styles: [
  ]
})

export class HdElementComponent {
  @Input() hitDices: HitDice[] = [];
  @Input() hp: number;

  getHd(): string {
    return this.hitDices.reduce(
      (res, hd) => res += `${hd.hd_amount}k${hd.hd_type}, `, '')
      .slice(0, -2);
  }
}
