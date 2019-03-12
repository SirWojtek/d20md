import { Component, Input } from '@angular/core';

import { SpellLevel } from '../../shared/model/spell-level';
import { chromaColor } from '../../shared/chroma-color';

@Component({
  selector: 'd20md-spell-level-element',
  template: `
  <span>
    <div class="level-container"
      [style.color]="levelColor(level.level)"
      [style.border-color]="levelColor(level.level)"
      >
      <span class="level">{{ level.level }}</span>
    </div>
    {{ level.class_name | startCase }}
  </span>
  `,
  styles: [
    `.level-container {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border: 2px solid white;
      border-radius: 50%;
      width: 25px;
      height: 25px;
    }`,
    `.level {
      font-weight: bold;
    }`,
  ]
})

export class SpellLevelElementComponent {
  @Input() level: SpellLevel;

  levelColor = chromaColor([0, 2, 4, 6, 9]);
}
