import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import * as _ from 'lodash';

import {Armor} from '../../../shared/model/armor';
import {
  ModalBaseComponent,
  ModalButton,
} from '../../../shared/elements/modal-base/modal-base.component';

@Component({
  selector: 'd20md-armor-form',
  templateUrl: './armor-form.component.html',
})
export class ArmorFormComponent {
  @Output()
  armorChange = new EventEmitter<Armor>();

  @ViewChild(ModalBaseComponent)
  modal: ModalBaseComponent;

  armor: Armor;

  modalButtons: ModalButton[] = [
    new ModalButton('cancel-armor', 'Cancel', 'btn-warning'),
    new ModalButton('save-armor', 'Save', 'btn-primary', () =>
      this.onSave(this.armor),
    ),
  ];

  show(armor: Armor) {
    this.armor = _.cloneDeep(armor);
    this.modal.showModal();
  }

  onSave(armor: Armor) {
    this.armor = armor;
    this.armorChange.emit(this.armor);
    return true;
  }
}
