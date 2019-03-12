import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'd20md-add-attack-group',
  template: `
  <div class="col-xs-4">
    <div class="list-group">
      <div class="list-group-item inactive">
        <button type="button" class="btn btn-sm btn-success" (click)="onAdd.emit()">
          <d20md-icon [iconName]="'fa-plus'"></d20md-icon>
        </button>
      </div>
    </div>
  </div>
  `
})

export class AddAttackGroupComponent {
  @Output() onAdd = new EventEmitter();
}
