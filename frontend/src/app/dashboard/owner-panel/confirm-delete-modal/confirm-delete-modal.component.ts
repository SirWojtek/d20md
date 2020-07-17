import {Output, Component, EventEmitter, ViewChild} from '@angular/core';
import {
  ModalButton,
  ModalBaseComponent,
} from '../../../shared/elements/modal-base/modal-base.component';

@Component({
  selector: 'd20md-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
})
export class ConfirmDeleteModalComponent {
  @Output()
  deleteEntity = new EventEmitter<number>();

  @ViewChild(ModalBaseComponent)
  modal: ModalBaseComponent;

  entity: {name: string; id: number};

  modalButtons: ModalButton[] = [
    new ModalButton('do-no-delete', 'No, keep it', 'btn-primary', () => true),
    new ModalButton('do-delete', 'Yes, delete it', 'btn-danger', () =>
      this.onDelete(),
    ),
  ];

  show(entity: {name: string; id: number}) {
    this.entity = entity;
    this.modal.showModal();
  }

  onDelete(): boolean {
    this.deleteEntity.emit(this.entity.id);
    return true;
  }
}
