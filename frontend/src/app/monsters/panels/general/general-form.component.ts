import {Component, Output, ViewChild, EventEmitter} from '@angular/core';
import {
  ModalBaseComponent,
  ModalButton,
} from '../../../shared/elements/modal-base/modal-base.component';
import {Image} from '../../../shared/model/image';
import {cloneDeep} from 'lodash';
import {EnumService} from '../../../shared/enum.service';
import {Observable} from 'rxjs/Observable';
import {Utils} from '../../../shared/utils';
import {Monster} from '../../../shared/model/monster';
import {slideInOutLeft} from '../../../shared/animations';
import {typeAppliers, MonsterSubtype} from '../../add/type/monster-types';
import {HitDice} from '../../../shared/model/hit-dice';

export interface IGeneralMonsterData {
  type: string;
  initiative: number;
  Image: Image;
}

@Component({
  selector: 'd20md-general-form',
  templateUrl: './general-form.component.html',
  animations: [slideInOutLeft],
})
export class GeneralFormComponent {
  monster: Monster;

  currentImage: File;

  monsterTypes: Observable<{[index: string]: string}>;
  monsterSubtypes: Observable<{[index: string]: MonsterSubtype}>;

  typeChanged: boolean;
  applyType: boolean;
  subtype: MonsterSubtype;

  @Output()
  onChange = new EventEmitter<IGeneralMonsterData>();

  @ViewChild(ModalBaseComponent)
  modal: ModalBaseComponent;

  modalButtons: ModalButton[] = [
    new ModalButton('Cancel', 'btn-warning'),
    new ModalButton('Save', 'btn-primary', () => this.onSave()),
  ];

  constructor(enumService: EnumService) {
    this.monsterTypes = enumService
      .getMonsterTypes()
      .map(Utils.createUpperCaseToNoUpperCaseMap);

    this.monsterSubtypes = Observable.of({
      Air: MonsterSubtype.Air,
      Earth: MonsterSubtype.Earth,
      Fire: MonsterSubtype.Fire,
      Water: MonsterSubtype.Water,
    });
  }

  show(monster: Monster) {
    this.monster = cloneDeep(monster);
    this.typeChanged = false;
    this.applyType = false;
    this.subtype = MonsterSubtype.Air;

    this.modal.showModal();
  }

  enableSubtype(): boolean {
    return this.applyType && this.monster.type === 'elemental';
  }

  onSave() {
    if (this.applyType) {
      const type = this.monster.type;
      const hdAmount = HitDice.countHd(this.monster.HitDices);

      this.monster = typeAppliers[type].apply(this.monster, hdAmount, {
        subtype: this.subtype,
      });
    }

    this.onChange.emit(this.monster);
    return true;
  }
}
