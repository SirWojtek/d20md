import {Component, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import * as _ from 'lodash';

import {Utils} from '../../shared/utils';
import {
  ModalBaseComponent,
  ModalButton,
} from '../../shared/elements/modal-base/modal-base.component';
import {environmentTagColors} from './environment-tag-colors';

@Component({
  selector: 'd20md-find-tag',
  template: `
  <d20md-modal-base [buttons]="modalButtons"
    [headerText]="'Choose environment tags'"
    [config]="{ show: true, backdrop: false }"
  >
    <div *ngFor="let tagGroup of chunkedTags" class="row">
      <div *ngFor="let tag of tagGroup" class="col-xs-4">
        <label>
        <input type="checkbox" [(ngModel)]="tag.value">
          {{ utils.toUpperCase(tag.key) }}
        </label>
      </div>
    </div>
  </d20md-modal-base>
  `,
})
export class FindTagComponent {
  modalButtons: ModalButton[] = [
    new ModalButton('tag-ok', 'OK', 'btn-primary', () => this.close()),
  ];
  @ViewChild(ModalBaseComponent)
  modal: ModalBaseComponent;

  @Input()
  tags: string[] = [];
  @Output()
  tagsChange = new EventEmitter<string[]>();

  chunkedTags: any[][];
  utils = Utils;

  private allTags: any[];

  constructor() {
    this.allTags = _.reduce(
      environmentTagColors,
      (res, value, key) => {
        res.push({key: key, value: false});
        return res;
      },
      [],
    );
    this.chunkTags();
  }

  show() {
    this.modal.showModal();

    for (const tag of this.allTags) {
      tag.value = this.tags.includes(tag.key);
    }

    this.chunkTags();
  }

  close() {
    this.tags = this.allTags.filter(tag => tag.value).map(tag => tag.key);

    this.tagsChange.emit(this.tags);
    return true;
  }

  private chunkTags() {
    this.chunkedTags = _.chunk(this.allTags, 3);
  }
}
