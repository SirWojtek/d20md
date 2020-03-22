import { Component, Input } from '@angular/core';

@Component({
  selector: 'd20md-spell-type-element',
  template: `
    <div *ngIf="showImage; else spellTypeText">
      <img [src]="'assets/img/' + spellType + '.svg'" />
      <span style="font-size: 15px">{{ spellType | startCase }}</span>
    </div>
    <ng-template #spellTypeText>
      <div class="text-container">
        <span>Spell type</span>
        <span
          ><b>{{ spellType | startCase }}</b></span
        >
      </div>
    </ng-template>
  `,
  styles: [
    `
      img {
        width: 64px;
        height: 64px;
      }
      .text-container {
        display: flex;
        justify-content: space-around;
      }
    `
  ]
})
export class SpellTypeElementComponent {
  @Input() spellType: string;
  @Input() showImage = true;
}
