import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Damage } from '../../../shared/model/damage';
import { Utils } from '../../../shared/utils';

@Component({
  selector: 'd20md-damage-table',
  template: `
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>Dice</th>
        <th>Description</th>
        <th>Type</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let damage of damages">
        <td>{{ damage.toString() }}</td>
        <td>{{ damage.description }}</td>
        <td>{{ utils.toUpperCase(damage.damage_type) }}</td>
        <td class="with-button">
          <button type="button" class="btn btn-danger btn-sm" (click)="onDelete.emit(damage)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
  `,
  styles: [
    'table.table { margin: 20px 0 0 0 }',
    'table>tbody>tr>td { vertical-align: middle; }',
    'table>tbody>tr>td.with-button { text-align: center; }'
  ]
})

export class DamageTableComponent {
  @Input() damages: Damage[] = [];
  @Output() onDelete = new EventEmitter<Damage>();

  public utils = Utils;
}
