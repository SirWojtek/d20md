import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { EnumService } from '../../shared/enum.service';
import { Utils } from '../../shared/utils';
import { environmentTagColors } from './environment-tag-colors';

@Component({
  selector: 'd20md-find-form',
  templateUrl: './find-form.component.html'
})

export class FindFormComponent {
  name = '';
  @Output() nameChange = new EventEmitter<string>();

  size = '';
  @Output() sizeChange = new EventEmitter<string>();
  sizes: Observable<{[index: string]: string; }>;

  type = '';
  @Output() typeChange = new EventEmitter<string>();
  types: Observable<{[index: string]: string; }>;

  cr = [ 1, 70 ];
  @Output() crChange = new EventEmitter<number[]>();

  hdSum = [ 1, 150 ];
  @Output() hdSumChange = new EventEmitter<number[]>();

  hp = [ 1, 3000 ];
  @Output() hpChange = new EventEmitter<number[]>();

  armorSum = [ 1, 120 ];
  @Output() armorSumChange = new EventEmitter<number[]>();

  attackMax = [ 1, 110 ];
  @Output() attackMaxChange = new EventEmitter<number[]>();

  environmentTags: string[] = [];
  @Output() environmentTagsChange = new EventEmitter<string[]>();

  sortMap = { 'asc': [], 'desc': [] };
  @Output() sortMapChange = new EventEmitter<any>();

  utils = Utils;
  environmentTagColors = environmentTagColors;

  constructor(enumService: EnumService) {
    this.sizes = enumService.getSizes()
      .map(Utils.createUpperCaseToNoUpperCaseMap)
      .map(sizes => {
        sizes['Any'] = '';
        return sizes;
      });
    this.types = enumService.getMonsterTypes()
      .map(Utils.createUpperCaseToNoUpperCaseMap)
      .map(types => {
        types['Any'] = '';
        return types;
      });
  }

  onSortChange(field: string, sortType: string) {
    this.removeFieldFromSortMap(field);
    if (sortType) { this.sortMap[sortType].push(field); }
    this.sortMapChange.emit(this.sortMap);
  }

  private removeFieldFromSortMap(field: string) {
    let index = this.sortMap['asc'].indexOf(field);
    if (index !== -1 ) {
      this.sortMap['asc'].splice(index, 1);
      return;
    }
    index = this.sortMap['desc'].indexOf(field);
    if (index !== -1 ) {
      this.sortMap['desc'].splice(index, 1);
      return;
    }
  }
}
