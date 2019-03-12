import { Component, Input } from '@angular/core';

import { chromaColor } from '../../../shared/chroma-color';

@Component({
  selector: 'd20md-cr-element',
  template: `
  <div class="cr-circle pull-right"
    *ngIf="cr"
    [style.color]="crColor(cr)"
    title="Challenge Rating"
  >
    <span>{{ cr | number: '2.0' }}</span>
  </div>
  `,
  styles: [
    `.cr-circle {
      width: 30px;
      height: 30px;
      padding-top: 3px;
      padding-left: 5px;
      font-size: 14px;
      font-weight: bold;
      border-radius: 25px;
      border: 2px solid;
      margin: auto;
    }`
  ]
})

export class CrElementComponent {
  @Input() cr: number;

  crColor = chromaColor([0, 10, 20, 40, 60]);
}
