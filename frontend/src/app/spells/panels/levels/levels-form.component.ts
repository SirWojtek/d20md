import { Component } from '@angular/core';
import { SpellLevel } from '../../../shared/model/spell-level';
import { ModalFormComponent } from '../../../shared/elements/modal-form/modal-form.component';

@Component({
  selector : 'd20md-level-form',
  template : `
  <d20md-modal-base [buttons]="modalButtons">
    <form *ngIf="value" class="form-horizontal">
      <d20md-inputbox
        [name]="'level'" [id]="'spell-level'"
        [labelText]="'Level'"
        [inputType]="'range'"
        [rangeMin]="0" [rangeMax]="9" [rangeStep]="1"
        [(value)]="value.level"
      ></d20md-inputbox>
      <d20md-inputbox
        [name]="'class'" [id]="'spell-class'"
        [labelText]="'Class'"
        [inputType]="name"
        [(value)]="value.class_name"
      ></d20md-inputbox>
    </form>
  </d20md-modal-base>
  `,
})

export class LevelFormComponent extends ModalFormComponent {
  constructor() {
    super();
    super.init(SpellLevel);
  }
}
