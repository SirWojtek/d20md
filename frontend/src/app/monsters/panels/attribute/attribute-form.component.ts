import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import * as _ from 'lodash';

import {Attribute} from '../../../shared/model/attribute';
import {
  ModalBaseComponent,
  ModalButton,
} from '../../../shared/elements/modal-base/modal-base.component';

@Component({
  selector: 'd20md-attribute-form',
  templateUrl: './attribute-form.component.html',
})
export class AttributeFormComponent {
  @Output()
  attributeChange = new EventEmitter<Attribute>();

  @ViewChild(ModalBaseComponent)
  modal: ModalBaseComponent;

  attribute: Attribute;

  modalButtons: ModalButton[] = [
    new ModalButton('cancel-attributes', 'Cancel', 'btn-warning'),
    new ModalButton('save-attributes', 'Save', 'btn-primary', () =>
      this.onSave(this.attribute),
    ),
  ];

  show(attribute: Attribute) {
    this.attribute = _.cloneDeep(attribute);
    this.modal.showModal();
  }

  onSave(attribute: Attribute) {
    this.attribute = attribute;
    this.attributeChange.emit(this.attribute);
    return true;
  }
}
