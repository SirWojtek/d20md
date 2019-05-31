import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import * as _ from 'lodash';

import {Save} from '../../../shared/model/save';
import {
  ModalBaseComponent,
  ModalButton,
} from '../../../shared/elements/modal-base/modal-base.component';

@Component({
  selector: 'd20md-save-form',
  templateUrl: './save-form.component.html',
})
export class SaveFormComponent {
  @Output()
  saveChange = new EventEmitter<Save>();

  @ViewChild(ModalBaseComponent)
  modal: ModalBaseComponent;

  save: Save;

  modalButtons: ModalButton[] = [
    new ModalButton('cancel-saves', 'Cancel', 'btn-warning'),
    new ModalButton('save-saves', 'Save', 'btn-primary', () =>
      this.onSave(this.save),
    ),
  ];

  show(save: Save) {
    this.save = _.cloneDeep(save);
    this.modal.showModal();
  }

  onSave(save: Save) {
    this.save = save;
    this.saveChange.emit(this.save);
    return true;
  }
}
