import { Component, Input } from '@angular/core';
import { Attribute } from '../../../shared/model/attribute';
import { Utils } from '../../../shared/utils';
import { chromaColor } from '../../../shared/chroma-color';

@Component({
  selector : 'd20md-show-attribute',
  template : `
  <table *ngIf="attribute" class="table table-striped panel-table">
    <thead><tr>
      <th class="col-sm-4">Attribute</th>
      <th class="col-sm-3 value-col">Value</th>
      <th class="col-sm-3 value-col">Modifier</th>
    </tr></thead>
    <tbody>
      <tr *ngFor="let attributeType of attributeTypes" [style.color]="getColor(attributeType)">
        <td>{{ utils.toUpperCase(attributeType) }}</td>
        <td class="value-col">{{ attribute[attributeType] }}</td>
        <td class="value-col">{{ attribute.mod[attributeType] }}</td>
      </tr>
    </tbody>
  </table>
  `,
})

export class ShowAttributeComponent {
  @Input() attribute: Attribute;

  attributeTypes = ['strength', 'dexterity', 'constitution', 'wisdom', 'intelligence', 'charisma' ];
  utils = Utils;

  private chromaColor = chromaColor([0, 10, 15, 20, 50]);

  public getColor(attributeType: string): string {
    return this.chromaColor(this.attribute[attributeType]);
  }
}
