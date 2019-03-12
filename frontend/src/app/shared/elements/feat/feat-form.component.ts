import {Component, ViewChild, Output, EventEmitter} from '@angular/core';
import * as _ from 'lodash';
import {Feat} from '../../../shared/model/feat';
import {
  ModalBaseComponent,
  ModalButton,
} from '../../../shared/elements/modal-base/modal-base.component';

@Component({
  selector: 'd20md-feat-form',
  template: `
  <d20md-modal-base [buttons]="modalButtons"
    [headerText]="'Add/remove Feats'"
    [modalSizeClass]="'modal-lg'"
  >
    <d20md-feat-editor [(feats)]="feats"></d20md-feat-editor>
  </d20md-modal-base>
  `,
})
export class FeatFormComponent {
  public feats: Feat[] = [];
  @Output()
  featsChange = new EventEmitter<Feat[]>();

  @ViewChild(ModalBaseComponent)
  modal: ModalBaseComponent;

  public modalButtons: ModalButton[] = [
    new ModalButton('Cancel', 'btn-warning'),
    new ModalButton('Save', 'btn-primary', () => this.onSave()),
  ];

  public show(value: Feat[]) {
    this.feats = _.clone(value);
    this.modal.showModal();
  }

  private onSave() {
    this.featsChange.emit(this.feats);
    return true;
  }
}
