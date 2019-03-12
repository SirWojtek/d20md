import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'd20md-range-slider',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RangeSliderComponent),
      multi: true
    }
  ],
  templateUrl: './range-slider.component.html',
  styleUrls: [ './range-slider.component.scss' ]
})

export class RangeSliderComponent implements ControlValueAccessor {
  @Input() name: string;
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() connect = [ true, false ];

  @Input() inputDivClass = 'col-sm-4';

  private _value = null;

  get value() { return this._value; }
  set value(value: any) {
    if (value === null) { return; }
    this._value = value;
    this.onChange(this._value);
  }

  writeValue(value: any): void {
    if (!value) { return; }
    this._value = value;
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
  }

  private onChange = (value: any) => {};
}
