import {Component, Input} from '@angular/core';
import {Monster} from '../../model/monster';

@Component({
  selector: 'd20md-monsters-using-panel',
  template: `
  <div *ngIf="monsters?.length" class="panel panel-primary">
    <div class="panel-heading"><b>Monsters Using</b></div>
    <div class="panel-body">
      <d20md-miniature-container
       [miniatures]="monsters | monstersToMiniatures"
       [miniatureClass]="'col-md-3'"
       [itemsPerPage]="12"
      >
      </d20md-miniature-container>
    </div>
  </div>
  `,
})
export class MonstersUsingPanelComponent {
  @Input()
  monsters: Monster[];
}
