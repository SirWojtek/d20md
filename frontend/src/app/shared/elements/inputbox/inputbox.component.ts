import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Utils } from '../../utils';

@Component({
  selector : 'd20md-inputbox',
  templateUrl: './inputbox.component.html',
   styleUrls: [ './inputbox.component.scss' ],
})

export class InputboxComponent {
  @Input() name: string;
  @Input() id: string;
  @Input() labelText: string;
  @Input() inputDivClass = 'col-sm-6';
  @Input() inputClass = 'form-control input-sm';
  @Input() inputType = 'text';
  @Input() inputPlaceholder: string;
  @Input() inputAccept: string;
  @Input() maxLength = 524288;
  @Input() rangeMin = 0;
  @Input() rangeMax = 100;
  @Input() rangeStep = 1;
  @Input() value: string;
  @Input() errorText: string;
  @Output() valueChange = new EventEmitter<any>();
  @Output() onChange = new EventEmitter<any>();
  @Output() onFocusOut = new EventEmitter();

  public utils = Utils;

  onModelChange(newVal: any) {
    if (this.inputType === 'range') {
      this.valueChange.emit(Number(newVal));
    } else {
      this.valueChange.emit(newVal);
    }
  }
}
