import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HitDice } from '../../../shared/model/hit-dice';
import { EnumService } from '../../../shared/enum.service';
import { ModalFormComponent } from '../../../shared/elements/modal-form/modal-form.component';

@Component({
  selector: 'd20md-hit-dice-form',
  templateUrl: './hit-dice-form.component.html',
})

export class HitDiceFormComponent extends ModalFormComponent {
  public hdTypes: Observable<{[index: string]: number; }>;

  constructor(enumService: EnumService) {
    super();
    super.init(HitDice);

    this.hdTypes = enumService.getDices()
      .map(dices => dices.reduce((res, dice) => {
        res[String(dice)] = dice;
        return res;
      }, {}));
  }
}
