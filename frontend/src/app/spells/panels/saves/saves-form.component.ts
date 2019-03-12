import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ModalBaseComponent, ModalButton } from '../../../shared/elements/modal-base/modal-base.component';
import { EnumService } from '../../../shared/enum.service';
import { Utils } from '../../../shared/utils';

@Component({
  selector: 'd20md-saves-form',
  templateUrl: './saves-form.component.html'
})

export class SavesFormComponent {
  @Output() saveChange = new EventEmitter<string>();
  @Output() spellResistableChange = new EventEmitter<boolean>();

  @ViewChild(ModalBaseComponent) modal: ModalBaseComponent;

  save: string;
  spellResistable: boolean;
  saves: Observable<{[index: string]: string; }>;

  private initialSave: string;
  private initialSpellResistable: boolean;

  constructor(enumService: EnumService) {
    this.saves = enumService.getSpellSaves()
      .map(Utils.createUpperCaseToNoUpperCaseMap);
  }

  modalButtons: ModalButton[] = [
    new ModalButton('Cancel', 'btn-warning'),
    new ModalButton('Save', 'btn-primary', () => this.onSave()),
  ];

  show(save: string, spellResistable: boolean) {
    [ this.save, this.spellResistable ] = [ save, spellResistable ];
    [ this.initialSave, this.initialSpellResistable ] = [ save, spellResistable ];
    this.modal.showModal();
  }

  onSave() {
    if (this.save !== this.initialSave) {
      this.saveChange.emit(this.save);
    }
    if (this.spellResistable !== this.initialSpellResistable) {
      this.spellResistableChange.emit(this.spellResistable);
    }
    return true;
  }
}
