import { Component, Input } from '@angular/core';
import { SpellLevel } from '../../../shared/model/spell-level';
import { Utils } from '../../../shared/utils';
import { chromaColor } from '../../../shared/chroma-color';

@Component({
  selector : 'd20md-show-levels',
  template : `
  <table *ngIf="spellLevels && spellLevels.length; else noLevels" class="table table-striped">
    <thead><tr>
      <th>Class name</th>
      <th class="value-col">Level</th>
    </tr></thead>
    <tbody>
      <tr *ngFor="let spellLevel of spellLevels" [style.color]="getColor(spellLevel)">
        <td>{{ utils.toUpperCase(spellLevel.class_name) }}</td>
        <td class="value-col">{{ spellLevel.level }}</td>
      </tr>
    </tbody>
  </table>
  <ng-template #noLevels>
    <h4>This spell have no level assigned</h4>
  </ng-template>
  `,
})

export class ShowLevelsComponent {
  @Input() spellLevels: SpellLevel[];

  utils = Utils;

  private levelColor = chromaColor([0, 10]);

  public getColor(spellLevel: SpellLevel) {
    return this.levelColor(spellLevel.level);
  }
}
