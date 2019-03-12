import { Component, Input } from '@angular/core';

@Component({
  selector: 'd20md-armor-element',
  template: `
  <img src="assets/img/armor.svg" title="Armor Class" height="32"/>
  <span>{{ armor }}</span>
  `
})

export class ArmorElementComponent {
  @Input() armor: number;
}
