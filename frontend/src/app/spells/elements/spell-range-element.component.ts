import { Component, Input } from '@angular/core';

const barPercents: {[range: string]: string} = {
  none: '0%',
  personal: '17%',
  touch: '33%',
  close: '50%',
  medium: '67%',
  long: '83%',
  unlimited: '100%',
};

@Component({
  selector: 'd20md-spell-range-element',
  template: `
  <h5>Range</h5>
  <div style="height: 40px" *ngIf="isStandardRange(); else customRange">
    <div align="left" class="bar-border" title="{{ spellRange | startCase }}">
      <div class="bar" [style.width]="getBarPercent()"></div>
    </div>
    <div class="legend">
      <span>N</span><span>P</span><span>T</span>
      <span>C</span><span>M</span><span>L</span>
      <span>U</span>
    </div>
  </div>
  <ng-template #customRange>
    <div class="custom-range">
      CUSTOM
    </div>
  </ng-template>
  `,
  styles: [
    `.bar-border {
      height: 50%;
      border: 2px solid #676767;
      border-radius: 4px;
    }`,
    `.bar {
      height: 100%;
      background: linear-gradient(to right, #1e6aff, #c025ff);
    }`,
    `.legend {
      height: 50%;
      display: flex;
      justify-content: space-between;
    }`,
    `.custom-range {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      border: 2px dashed #676767;
      border-radius: 4px;
      font-weight: bold;
    }`
  ]
})

export class SpellRangeElementComponent {
  @Input() spellRange: string;

  isStandardRange(): boolean {
    return Object.keys(barPercents).includes(this.spellRange);
  }

  getBarPercent(): string {
    return barPercents[this.spellRange];
  }
}
