import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'd20md-feat-type-panel',
  template: `
  <div class="panel panel-primary">
    <div class="panel-heading"><b>Feat type</b></div>
    <div class="panel-body">
      <d20md-show-feat-type [featType]="featType"></d20md-show-feat-type>
    </div>
    <div *ngIf="canModify" class="panel-footer">
      <button type="button" class="btn btn-default"
      (click)="editor.show(featType)">Edit</button>
    </div>
  </div>
  <d20md-feat-type-form #editor
    (featTypeChange)="featTypeChange.emit($event)"
  ></d20md-feat-type-form>
  `,
})
export class FeatTypePanelComponent {
  @Input()
  featType: string;
  @Output()
  featTypeChange = new EventEmitter<string>();

  @Input()
  canModify: boolean;
}
