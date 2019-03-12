import {Component, Input} from '@angular/core';
import {chromaInvertBW} from '../../../shared/chroma-color';

@Component({
  selector: 'd20md-chips',
  template: `
  <div class="chip"
    [style.color]="color"
    [style.background-color]="backgroundColor"
    [style.border-color]="borderColor || backgroundColor"
  >
    <ng-content></ng-content>
  </div>
  `,
  styles: [
    `
      .chip {
        display: inline-block;
        margin: 1px;
        padding: 0 10px;
        border: 2px solid transparent;
        border-radius: 25px;
        line-height: 20px;
        background-color: transparent;
      }
    `,
  ],
})
export class ChipsComponent {
  @Input()
  color = 'black';
  @Input()
  set backgroundColor(val: string) {
    if (!val || this.backgroundColor_ === val) {
      return;
    }

    this.backgroundColor_ = val;

    if (!this.color) {
      this.color = this.getTextColor();
    }
  }
  get backgroundColor(): string {
    return this.backgroundColor_;
  }

  @Input()
  borderColor = null;

  private backgroundColor_ = 'white';

  private getTextColor(): string {
    if (this.backgroundColor === 'transparent') {
      return 'white';
    }
    return chromaInvertBW(this.backgroundColor);
  }
}
