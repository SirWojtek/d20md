import { Component, Input } from '@angular/core';

@Component({
  selector: 'd20md-show-details',
  template: `
    <d20md-spell-type-element
      [spellType]="spellType"
      [showImage]="showImage"
    ></d20md-spell-type-element>
    <d20md-spell-range-element
      [spellRange]="spellRange"
      [showBar]="showImage"
    ></d20md-spell-range-element>
  `
})
export class ShowDetailsComponent {
  @Input() spellType: string;
  @Input() spellRange: string;
  @Input() showImage = true;
}
