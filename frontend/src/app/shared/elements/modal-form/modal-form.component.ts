import {Component, Output, EventEmitter, ViewChild, Type} from '@angular/core';
import {
  ModalBaseComponent,
  ModalButton,
} from '../modal-base/modal-base.component';

@Component({
  template: `
  <d20md-modal-base #modal [buttons]="modalButtons">
  </d20md-modal-base>
  `,
})
export class ModalFormComponent {
  public value: any;
  public valueType: Type<any>;
  public addMode: boolean;
  @Output()
  onAdd = new EventEmitter<any>();

  @ViewChild(ModalBaseComponent)
  modal: ModalBaseComponent;

  public modalButtons: ModalButton[] = [
    new ModalButton('save-modal-form', 'Save', 'btn-primary', () =>
      this.onSave(),
    ),
  ];

  public init(valueType: Type<any>) {
    this.valueType = valueType;
  }

  public show(value: any) {
    if (value) {
      this.value = value;
      this.addMode = false;
    } else {
      this.value = new this.valueType();
      this.addMode = true;
    }

    this.afterShow();
    this.modal.showModal();
  }

  afterShow() {
    // NOTE: implement in child
  }

  onSave() {
    if (this.addMode) {
      this.onAdd.emit(this.value);
    }

    return true;
  }
}
