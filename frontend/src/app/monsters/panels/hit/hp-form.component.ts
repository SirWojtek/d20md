import {Component, Output, EventEmitter, ViewChild} from '@angular/core';
import {
  ModalButton,
  ModalBaseComponent,
} from '../../../shared/elements/modal-base/modal-base.component';

@Component({
  selector: 'd20md-hp-form',
  templateUrl: './hp-form.component.html',
  styleUrls: ['./hp-form.component.scss'],
})
export class HpFormComponent {
  public suggestedHp: number;
  public hp: number;
  @Output()
  hpChange = new EventEmitter<number>();

  @ViewChild(ModalBaseComponent)
  modal: ModalBaseComponent;

  public errorText = '';

  public modalButtons: ModalButton[] = [
    new ModalButton('cancel-hp', 'Cancel', 'btn-warning'),
    new ModalButton('save-hp', 'Save', 'btn-primary', () => this.onSave()),
  ];

  public show(hp: number, suggestedHp) {
    this.hp = hp;
    this.suggestedHp = suggestedHp;
    this.modal.showModal();
  }

  onHpChange(newVal: string) {
    if (!newVal) {
      return;
    }

    const val = +newVal;
    if (val < 1 || val > 2000) {
      this.errorText = 'HP should be greater than 0 and no more than 2000';
      return;
    }

    this.errorText = '';
    this.hp = val;
  }

  onSave() {
    if (this.errorText) {
      return false;
    }
    this.hpChange.emit(this.hp);
    return true;
  }
}
