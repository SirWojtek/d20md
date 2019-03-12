import { Component, Input } from '@angular/core';

import { environmentTagColors } from '../environment-tag-colors';
import { EnvironmentTag } from '../../../shared/model/environment-tag';
import { Utils } from '../../../shared/utils';

@Component({
  selector: 'd20md-environment-element',
  template: `
  <d20md-chips *ngFor="let env of getTags()"
    [backgroundColor]="colorMap[env.type]"
    [attr.title]="getTitle(env)"
  >
    {{ utils.toUpperCase(env.type) }}
  </d20md-chips>
  `,
})

export class EnvironmentElementComponent {
  @Input() environmentTags: EnvironmentTag[] = [];

  utils = Utils;
  colorMap = environmentTagColors;

  private maxTags = 5;

  getTags(): EnvironmentTag[] {
    if (this.environmentTags.length === 1) {
      return this.environmentTags;
    }
    return this.environmentTags.filter(tag => tag.type !== 'any').slice(0, this.maxTags);
  }

  getColor(env: EnvironmentTag): string {
    if (!this.colorMap[env.type]) { return 'white'; }
    return this.colorMap[env.type];
  }

  getTitle(env: EnvironmentTag): string {
    return `Lives in ${env.type} environment`;
  }
}
