import { Component, Input } from '@angular/core';

@Component({
  selector: 'd20md-spell-type-element',
  template: `
  <img [src]="'assets/img/' + spellType + '.svg'">
  <span style="font-size: 15px">{{ spellType | startCase }}</span>
  `,
  styles: [
  `img {
    width: 64px;
    height: 64px;
  }`
  ]
})

export class SpellTypeElementComponent {
  @Input() spellType: string;
}
