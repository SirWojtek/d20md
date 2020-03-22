import { Component, Input } from '@angular/core';

const barPercents: { [range: string]: string } = {
  none: '0%',
  personal: '17%',
  touch: '33%',
  close: '50%',
  medium: '67%',
  long: '83%',
  unlimited: '100%'
};

@Component({
  selector: 'd20md-spell-range-element',
  template: `
    <div *ngIf="showBar; else rangeText">
      <h5>Range</h5>
      <div style="height: 40px" *ngIf="isStandardRange(); else customRange">
        <div
          align="left"
          class="bar-border"
          title="{{ spellRange | startCase }}"
        >
          <div class="bar" [style.width]="getBarPercent()"></div>
        </div>
        <div class="legend">
          <span>N</span><span>P</span><span>T</span> <span>C</span><span>M</span
          ><span>L</span>
          <span>U</span>
        </div>
      </div>
      <ng-template #customRange>
        <div class="custom-range">
          CUSTOM
        </div>
      </ng-template>
    </div>
    <ng-template #rangeText>
      <div class="text-container">
        <span>Spell range</span>
        <span
          ><b>{{ spellRange | startCase }}</b></span
        >
      </div>
    </ng-template>
  `,
  styleUrls: ['./spell-range-element.component.less']
})
export class SpellRangeElementComponent {
  @Input() spellRange: string;
  @Input() showBar = true;

  isStandardRange(): boolean {
    return Object.keys(barPercents).includes(this.spellRange);
  }

  getBarPercent(): string {
    return barPercents[this.spellRange];
  }
}
