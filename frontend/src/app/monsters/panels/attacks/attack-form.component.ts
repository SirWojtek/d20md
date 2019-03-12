import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Attack } from '../../../shared/model/attack';
import { Damage } from '../../../shared/model/damage';
import { EnumService } from '../../../shared/enum.service';
import { Utils } from '../../../shared/utils';
import { ModalFormComponent } from '../../../shared/elements/modal-form/modal-form.component';

@Component({
  selector: 'd20md-attack-form',
  templateUrl: './attack-form.component.html',
  styleUrls: [ './attack-form.component.scss' ]
})

export class AttackFormComponent extends ModalFormComponent {
  public attackTypes: Observable<{[index: string]: string; }>;
  public damageTypes: Observable<{[index: string]: string; }>;

  public newDamage = {
    dice: '',
    description: '',
    type: 'slashing'
  };
  private _damageError = false;
  private _diceError = false;

  get damageError() { return this._damageError; }
  set damageError(newVal: boolean) {
    this._damageError = newVal;
    if (newVal) { this._diceError = false; }
  }
  get diceError() { return this._diceError; }
  set diceError(newVal: boolean) {
    this._diceError = newVal;
    if (newVal) { this._damageError = false; }
  }

  private damageRegex = /(\d+)k(\d+)([+-]?\d+)?\/(\S+)/;

  constructor(enumService: EnumService) {
    super();
    super.init(Attack);

    this.attackTypes = enumService.getAttackTypes()
      .map(Utils.createUpperCaseToNoUpperCaseMap);
    this.damageTypes = enumService.getDamageTypes()
      .map(Utils.createUpperCaseToNoUpperCaseMap);
  }

  onDamageAdd() {
    const parsed = this.parseDamage();
    if (!parsed) { return; }

    this.value.Damages.push(parsed);
    this.newDamage = {
      dice: '',
      description: '',
      type: 'slashing'
    };
  }

  onDamageDelete(damage: Damage) {
    const index = this.value.Damages.indexOf(damage);
    if (index === -1) { return; }
    this.value.Damages.splice(index, 1);
  }

  private parseDamage(): Damage {
    const match = this.damageRegex.exec(this.newDamage.dice);
    if (!match) {
      this.damageError = true;
      return;
    } else if (!this.isDiceCorrect(Number(match[2]))) {
      this.diceError = true;
      return;
    }

    this.damageError = false;
    this.diceError = false;

    const damage = new Damage();
    damage.dd_amount = Number(match[1]);
    damage.dd_type = Number(match[2]);
    damage.damage_bonus = Number(match[3]) || 0;
    damage.critical = match[4];
    damage.description = this.newDamage.description;
    damage.damage_type = this.newDamage.type;
    return damage;
  }

  private isDiceCorrect(dice: number) {
    return [ 0, 2, 3, 4, 6, 8, 10, 12, 20 ].indexOf(dice) !== -1;
  }
}
