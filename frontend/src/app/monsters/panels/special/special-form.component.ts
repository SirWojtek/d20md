import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SpecialAbility } from '../../../shared/model/special-ability';
import { EnumService } from '../../../shared/enum.service';
import { Utils } from '../../../shared/utils';
import { ModalFormComponent } from '../../../shared/elements/modal-form/modal-form.component';
import { TrumbowygWrapperComponent } from '../../../shared/elements/trumbowyg-wrapper/trumbowyg-wrapper.component';

@Component({
  selector: 'd20md-special-form',
  templateUrl: './special-form.component.html',
})

export class SpecialFormComponent extends ModalFormComponent {
  public specialTypes: Observable<{[index: string]: string; }>;
  @Output() specialChange = new EventEmitter<SpecialAbility>();

  @ViewChild(TrumbowygWrapperComponent) trumbowyg: TrumbowygWrapperComponent;

  constructor(enumService: EnumService) {
    super();
    super.init(SpecialAbility);

    this.specialTypes = enumService.getSpecialTypes()
      .map(Utils.createUpperCaseToNoUpperCaseMap);
  }

  afterShow() {
    this.trumbowyg.init(this.value.description);
  }

  onSave() {
    if (this.addMode) {
      this.onAdd.emit(this.value);
    } else {
      this.specialChange.emit(this.value);
    }

    return true;
  }
}
