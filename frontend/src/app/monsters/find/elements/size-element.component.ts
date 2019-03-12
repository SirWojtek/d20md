import { Component, Input } from '@angular/core';

import { Utils } from '../../../shared/utils';

@Component({
  selector: 'd20md-size-element',
  template: `
  <h4>Size</h4>
  <h3 [attr.title]="getSizeTitle()">{{ sizeShorts[size] }}</h3>
  `,
  styles: [
    'h4 { margin-top: 0px }',
    'h3 { margin-top: 0px }'
  ]
})

export class SizeElementComponent {
  @Input() size: string;

  sizeShorts = {
    'fine': 'Fin',
    'diminutive': 'Dim',
    'small': 'Sml',
    'medium': 'Med',
    'large': 'Lrg',
    'huge': 'Hug',
    'gargantuan': 'Grg',
    'colossal': 'Col'
  };

  getSizeTitle(): string {
    return `${Utils.toUpperCase(this.size)}`;
  }
}
