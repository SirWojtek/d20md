import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Feat} from '../../../shared/model/feat';

@Component({
  selector: 'd20md-prerequisite-panel',
  template: `
  <div class="panel panel-primary">
    <div class="panel-heading"><b>Prerequisites</b></div>
    <div class="panel-body">
      <d20md-show-feats [feats]="prerequisites"></d20md-show-feats>
    </div>
    <div *ngIf="canModify" class="panel-footer">
      <button type="button" class="btn btn-default"
      (click)="featForm.show(prerequisites)">Edit</button>
    </div>
  </div>
  <d20md-feat-form #featForm
    (featsChange)="prerequisitesChange.emit($event)"
  ></d20md-feat-form>
  `,
})
export class PrerequisitePanelComponent {
  @Input()
  prerequisites: Feat[];
  @Output()
  prerequisitesChange = new EventEmitter<Feat[]>();

  @Input()
  canModify: boolean;
}
