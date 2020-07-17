import {Component, ViewChild, Output, EventEmitter} from '@angular/core';
import * as _ from 'lodash';
import {Spell} from '../../../shared/model/spell';
import {
  ModalBaseComponent,
  ModalButton,
} from '../../../shared/elements/modal-base/modal-base.component';

@Component({
  selector: 'd20md-spell-form',
  template: `
  <d20md-modal-base [buttons]="modalButtons"
    [headerText]="'Add/remove Spells'"
    [modalSizeClass]="'modal-lg'"
  >
    <d20md-spell-editor *ngIf="spells" [(spells)]="spells"></d20md-spell-editor>
  </d20md-modal-base>
  `,
})
export class SpellFormComponent {
  public spells: Spell[];
  @Output()
  spellsChange = new EventEmitter<Spell[]>();

  @ViewChild(ModalBaseComponent)
  modal: ModalBaseComponent;

  public modalButtons: ModalButton[] = [
    new ModalButton('cancel-spell', 'Cancel', 'btn-warning'),
    new ModalButton('save-spell', 'Save', 'btn-primary', () => this.onSave()),
  ];

  public show(value: Spell[]) {
    this.spells = _.clone(value);
    this.modal.showModal();
  }

  private onSave() {
    this.spellsChange.emit(this.spells);
    return true;
  }
}
