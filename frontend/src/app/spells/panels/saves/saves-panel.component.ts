import {Component, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'd20md-saves-panel',
  template: `
  <div class="panel panel-primary">
    <div class="panel-heading"><b>Saves</b></div>
    <div class="panel-body">
      <d20md-show-saves [save]="save"
        [spellResistable]="spellResistable"></d20md-show-saves>
    </div>
    <div *ngIf="canModify" class="panel-footer">
      <button type="button" class="btn btn-default"
      (click)="editor.show(save, spellResistable)">Edit</button>
    </div>
  </div>
  <d20md-saves-form #editor
    (saveChange)="saveChange.emit($event)"
    (spellResistableChange)="spellResistableChange.emit($event)"
  ></d20md-saves-form>
  `,
})
export class SavesPanelComponent {
  @Input()
  spellResistable: boolean;
  @Output()
  spellResistableChange = new EventEmitter<boolean>();

  @Input()
  save: string;
  @Output()
  saveChange = new EventEmitter<string>();

  @Input()
  canModify: boolean;
}
