import {Component, Output, ViewChild, EventEmitter} from '@angular/core';
import * as _ from 'lodash';
import {Speed} from '../../../shared/model/speed';
import {
  ModalBaseComponent,
  ModalButton,
} from '../../../shared/elements/modal-base/modal-base.component';

@Component({
  selector: 'd20md-speed-form',
  templateUrl: './speed-form.component.html',
})
export class SpeedFormComponent {
  speed: Speed;
  @Output()
  speedChange = new EventEmitter<Speed>();
  initiative: number;
  @Output()
  initiativeChange = new EventEmitter<number>();
  @Output()
  onChange = new EventEmitter<void>();

  @ViewChild(ModalBaseComponent)
  modal: ModalBaseComponent;

  modalButtons: ModalButton[] = [
    new ModalButton('cancel-speed', 'Cancel', 'btn-warning'),
    new ModalButton('save-speed', 'Save', 'btn-primary', () => this.onSave()),
  ];

  show(speed: Speed, initiative: number) {
    this.speed = _.clone(speed);
    this.initiative = initiative;
    this.modal.showModal();
  }

  onSave() {
    this.speedChange.emit(this.speed);
    this.initiativeChange.emit(this.initiative);
    this.onChange.emit();
    return true;
  }
}
