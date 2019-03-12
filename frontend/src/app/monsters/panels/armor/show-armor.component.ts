import {Component, Input} from '@angular/core';
import {Armor} from '../../../shared/model/armor';
import {Utils} from '../../../shared/utils';
import {chromaColor} from '../../../shared/chroma-color';

@Component({
  selector: 'd20md-show-armor',
  templateUrl: './show-armor.component.html',
})
export class ShowArmorComponent {
  @Input()
  armor: Armor;

  utils = Utils;

  public armorTypes = [
    'armor',
    'shield',
    'dexterity',
    'size',
    'enhancement',
    'deflection',
    'natural',
  ];
  public summaryTypes = ['touch', 'flat_footed', 'total'];

  private typeColor = chromaColor([-10, 0, 5, 10, 20]);
  private summaryColor = chromaColor([0, 10, 20, 30, 50]);

  public getColor(armorType: string) {
    return this.typeColor(this.armor[armorType]);
  }

  public getSummaryColor(summaryType: string) {
    return this.summaryColor(this.armor.summary[summaryType]);
  }
}
