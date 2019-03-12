import { Component, Input } from '@angular/core';

import { Utils } from '../../../shared/utils';

@Component({
  selector: 'd20md-type-element',
  template: `
  <img src="assets/img/{{ type }}.svg" [attr.title]="getTypeTitle()" height="64"/>
  `,
  styles: [
  ]
})

export class TypeElementComponent {
  @Input() type: string;

  getTypeTitle(): string {
    return `${Utils.toUpperCase(this.type)} type`;
  }
}
