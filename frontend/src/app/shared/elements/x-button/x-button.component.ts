import { Component, Output, EventEmitter, Input } from '@angular/core';
import { isString, isArray } from 'lodash';

@Component({
  selector: 'd20md-x-button',
  template: `
    <button [ngClass]="getButtonClasses()" (click)="clicked.emit()">
      <d20md-icon iconName="fa fa-times"></d20md-icon>
    </button>
  `,
  styles: [
    `
      .x-button {
        background-color: transparent;
        border-color: transparent;
        padding: 0px inherit;
        border: none;
      }
    `
  ]
})
export class XButtonComponent {
  @Input()
  btnClass: string | string[] = [];

  @Output()
  clicked = new EventEmitter<void>();

  getButtonClasses(): string[] {
    if (isString(this.btnClass)) {
      return [this.btnClass, 'x-button'];
    } else if (isArray(this.btnClass)) {
      return [...this.btnClass, 'x-button'];
    } else {
      return ['x-button'];
    }
  }
}
