import { Component, Input } from '@angular/core';

@Component({
  selector: 'd20md-icon',
  template: `
  <span>
    {{ textFirst ? text : '' }}
    <i [attr.class]="'fa ' + iconName" aria-hidden="true"></i>
    {{ !textFirst ? text : '' }}
  </span>
  `
})

export class IconComponent {
  @Input() iconName: string;
  @Input() text: string;
  @Input() textFirst = false;
}
