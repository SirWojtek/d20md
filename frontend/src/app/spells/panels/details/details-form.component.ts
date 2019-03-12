import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

import { ModalBaseComponent, ModalButton } from '../../../shared/elements/modal-base/modal-base.component';
import { EnumService } from '../../../shared/enum.service';
import { Utils } from '../../../shared/utils';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'd20md-details-form',
  templateUrl: './details-form.component.html'
})

export class DetailsFormComponent {
  @Output() spellTypeChange = new EventEmitter<string>();
  @Output() spellRangeChange = new EventEmitter<string>();

  @ViewChild(ModalBaseComponent) modal: ModalBaseComponent;

  spellType: string;
  spellRange: string;

  spellTypes: Observable<{ [index: string]: string; }>;
  spellRanges: Observable<{ [index: string]: string; }>;

  private initialSpellType: string;
  private initialSpellRange: string;

  constructor(
    enumService: EnumService
  ) {
    this.spellTypes = enumService.getSpellTypes()
    .map(Utils.createUpperCaseToNoUpperCaseMap);

    this.spellRanges = enumService.getSpellRanges()
    .map(Utils.createUpperCaseToNoUpperCaseMap);
  }

  modalButtons: ModalButton[] = [
    new ModalButton('Cancel', 'btn-warning'),
    new ModalButton('Save', 'btn-primary', () => this.onSave(this.spellType, this.spellRange)),
  ];

  show(spellType: string, spellRange: string) {
    this.spellType = spellType;
    this.initialSpellType = spellType;

    this.spellRange = spellRange;
    this.initialSpellRange = spellRange;

    this.modal.showModal();
  }

  onSave(newSpellType: string, newSpellRange: string) {
    if (this.initialSpellType !== this.spellType) {
      this.spellType = newSpellType;
      this.spellTypeChange.emit(this.spellType);
    }
    if (this.initialSpellRange !== this.spellRange) {
      this.spellRange = newSpellRange;
      this.spellRangeChange.emit(this.spellRange);
    }
    return true;
  }
}

