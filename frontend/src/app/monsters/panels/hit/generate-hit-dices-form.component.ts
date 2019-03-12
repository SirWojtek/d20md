import {Component, ViewChild, EventEmitter, Output} from '@angular/core';
import {
  ModalBaseComponent,
  ModalButton,
} from '../../../shared/elements/modal-base/modal-base.component';
import {Monster} from '../../../shared/model/monster';
import {FormControl, Validators} from '@angular/forms';
import {HitDice} from '../../../shared/model/hit-dice';
import {typeAppliers, MonsterSubtype} from '../../add/type/monster-types';
import {cloneDeep} from 'lodash';

@Component({
  selector: 'd20md-generate-hit-dices-form',
  templateUrl: './generate-hit-dices-form.component.html',
  styleUrls: ['./generate-hit-dices-form.component.scss'],
})
export class GenerateHitDicesFormComponent {
  @Output()
  onGenerate = new EventEmitter<Monster>();

  monster: Monster;

  @ViewChild(ModalBaseComponent)
  modal: ModalBaseComponent;

  hitDiceAmountControl = new FormControl(1, Validators.required);
  subtypeControl = new FormControl('air');

  monsterSubtypes = Object.keys(MonsterSubtype).map(s => MonsterSubtype[s]);

  modalButtons: ModalButton[] = [
    new ModalButton('Cancel', 'btn-warning'),
    new ModalButton('Recalculate', 'btn-primary', () => this.onSave()),
  ];

  show(monster: Monster) {
    this.monster = cloneDeep(monster);

    this.hitDiceAmountControl.setValue(HitDice.countHd(this.monster.HitDices));

    this.modal.showModal();
  }

  isSubtypeNeeded(): boolean {
    return this.monster.type === 'elemental';
  }

  onSave() {
    const type = this.monster.type;
    const hdAmount = this.hitDiceAmountControl.value;
    const subtype = this.subtypeControl.value;

    if (!hdAmount) {
      return false;
    }

    this.monster = typeAppliers[type].apply(this.monster, hdAmount, {
      subtype,
    });
    this.onGenerate.emit(this.monster);
    return true;
  }
}
