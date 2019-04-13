import {Component, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import * as _ from 'lodash';
import {Utils} from '../../../shared/utils';
import {
  ModalBaseComponent,
  ModalButton,
} from '../modal-base/modal-base.component';

export class TableProperties {
  constructor(
    public key: string,
    public display: string,
    public isValueKey: boolean = false,
    public valueTransformFunc: (value: any) => string = null,
  ) {}
}

@Component({
  selector: 'd20md-editor-table',
  template: `
  <d20md-modal-base #modal [modalSizeClass]="modalSize" [headerText]="header" [buttons]="modalButtons">
    <table *ngIf="values" class="table table-striped">
      <thead><tr>
        <th
          *ngFor="let property of properties"
          [ngClass]="{ 'value-col' : property.isValueKey }"
        >{{ property.display }}</th>
        <th class="text-right">Action</th>
      </tr></thead>
      <tbody>
        <tr *ngFor="let value of values">
          <td
            *ngFor="let property of properties"
            [ngClass]="{ 'value-col' : property.isValueKey }"
          >{{ getValueText(value, property) }}</td>
          <td class="value-col">
            <div class="pull-right">
              <button type="button" class="btn btn-primary" (click)="onEdit(value)">
                <d20md-icon iconName="fa-edit"></d20md-icon>
              </button>
              <button type="button" class="btn btn-danger" (click)="onDelete(value)">
                <d20md-icon iconName="fa-trash"></d20md-icon>
              </button>
            </div>
          </td>
        </tr>
        <tr><td [attr.colspan]="properties.length + 1">
          <button type="button" class="btn btn-success" (click)="onAdd()">
            <d20md-icon iconName="fa-plus"></d20md-icon>
          </button>
        </td></tr>
      </tbody>
    </table>
  </d20md-modal-base>
  `,
  styles: [':host td { vertical-align: middle; }'],
})
export class EditorTableComponent {
  @Input()
  header: string;
  @Input()
  modalSize = 'modal-md';
  @Input()
  properties: TableProperties[];
  @Output()
  onValueEdit = new EventEmitter<any>();
  @Output()
  onValueAdd = new EventEmitter<void>();
  @Output()
  onSave = new EventEmitter<any[]>();

  public values: any[];

  @ViewChild(ModalBaseComponent)
  modal: ModalBaseComponent;

  utils = Utils;

  public modalButtons: ModalButton[] = [
    new ModalButton('Cancel', 'btn-warning'),
    new ModalButton('Save', 'btn-primary', () => this.onValuesSave()),
  ];

  public show(values: any[]) {
    this.values = _.cloneDeep(values);
    this.modal.showModal();
  }

  public add(value: any) {
    this.values.push(value);
  }

  onEdit(value: any) {
    this.onValueEdit.emit(value);
  }

  onDelete(value: any) {
    const index = this.values.indexOf(value);
    if (index === -1) {
      return;
    }
    this.values.splice(index, 1);
  }

  onAdd() {
    this.onValueAdd.emit();
  }

  onValuesSave() {
    this.onSave.emit(this.values);
    return true;
  }

  getValueText(value: any, property: TableProperties): string {
    return property.valueTransformFunc
      ? property.valueTransformFunc(value)
      : Utils.toUpperCase(value[property.key]);
  }
}
