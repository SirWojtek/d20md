import {Component, Input, EventEmitter, Output} from '@angular/core';

import {SpellLevel} from '../../../shared/model/spell-level';
import {TableProperties} from '../../../shared/elements/editor-table/editor-table.component';


@Component({
  selector: 'd20md-levels-panel',
  template: `
  <div class="panel panel-primary">
    <div class="panel-heading"><b>Spell levels</b></div>
    <div class="panel-body">
      <d20md-show-levels [spellLevels]="spellLevels"></d20md-show-levels>
    </div>
    <div *ngIf="canModify" class="panel-footer">
      <button type="button" class="btn btn-default" (click)="editor.show(spellLevels)">Edit</button>
    </div>
  </div>
  <d20md-editor-table #editor
    [header]="'Edit spell levels'"
    [properties]="spellLevelProperties"
    (onValueEdit)="levelForm.show($event)"
    (onValueAdd)="levelForm.show(null)"
    (onSave)="spellLevelsChange.emit($event)"
  ></d20md-editor-table>
  <d20md-level-form #levelForm (onAdd)="editor.add($event)">
  </d20md-level-form>
  `,
})
export class LevelsPanelComponent {
  @Input()
  spellLevels: SpellLevel[] = [];
  @Output()
  spellLevelsChange = new EventEmitter<SpellLevel[]>();

  @Input()
  canModify: boolean;

  spellLevelProperties = [
    new TableProperties('class_name', 'Class name'),
    new TableProperties('level', 'Level', true),
  ];
}
