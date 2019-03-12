import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ModalBaseComponent, ModalButton } from '../../../shared/elements/modal-base/modal-base.component';
import { EnumService } from '../../../shared/enum.service';
import { Utils } from '../../../shared/utils';

@Component({
  selector: 'd20md-feat-type-form',
  templateUrl: './feat-type-form.component.html'
})

export class FeatTypeFormComponent {
  @Output() featTypeChange = new EventEmitter<string>();

  @ViewChild(ModalBaseComponent) modal: ModalBaseComponent;

  featType: string;

  featTypes: Observable<{[index: string]: string; }>;

  constructor(enumService: EnumService) {
    this.featTypes = enumService.getFeatTypes()
      .map(Utils.createUpperCaseToNoUpperCaseMap);
  }

  modalButtons: ModalButton[] = [
    new ModalButton('Cancel', 'btn-warning'),
    new ModalButton('Save', 'btn-primary', () => this.onSave()),
  ];

  show(featType: string) {
    this.featType = featType;
    this.modal.showModal();
  }

  onSave() {
    this.featTypeChange.emit(this.featType);
    return true;
  }
}
