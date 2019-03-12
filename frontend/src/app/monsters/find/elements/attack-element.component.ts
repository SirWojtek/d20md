import { Component, Input } from '@angular/core';

@Component({
  selector: 'd20md-attack-element',
  template: `
    <img src="assets/img/attack.svg" title="Max Attack Bonus" height="32" />
    <span>{{ attack }}</span>
  `,
  styles: [
  ]
})

export class AttackElementComponent {
  @Input() attack: number;
}
