import { Component, Input } from '@angular/core';

@Component({
  selector: 'd20md-spell-type-element',
  template: `
    <img
      *ngIf="showImage; else spellTypeText"
      [src]="'assets/img/' + spellType + '.svg'"
    />
    <ng-template #spellTypeText>
      <span>Spell type: </span>
    </ng-template>
    <span style="font-size: 15px">{{ spellType | startCase }}</span>
  `,
  styles: [
    `
      img {
        width: 64px;
        height: 64px;
      }
    `
  ]
})
export class SpellTypeElementComponent {
  @Input() spellType: string;
  @Input() showImage = true;
}
