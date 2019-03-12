import {Component, Input} from '@angular/core';
import {groupBy} from 'lodash';
import {FormBuilder} from '@angular/forms';
import {Feat} from '../../../shared/model/feat';

@Component({
  selector: 'd20md-show-feats',
  templateUrl: './show-feats.component.html',
  styleUrls: ['./show-feats.component.scss'],
})
export class ShowFeatsComponent {
  @Input()
  set feats(val: Feat[]) {
    if (!val) {
      return;
    }

    this.sortedFeats = groupBy(val, 'feat_type');

    const firstKey = Object.keys(this.sortedFeats)[0];
    this.typeControl.setValue(firstKey);
  }
  sortedFeats: {[type: string]: Feat[]} = {};

  typeControl = this.formBuilder.control(null);
  searchInput = '';

  constructor(private formBuilder: FormBuilder) {}

  getFilteredFeats(): Feat[] {
    const type = this.typeControl.value;
    if (!type) {
      return [];
    }
    return this.sortedFeats[type].filter(f =>
      f.name.toLowerCase().includes(this.searchInput.toLowerCase()),
    );
  }

  shouldShowSearchbox(): boolean {
    const type = this.typeControl.value;
    if (!type) {
      return false;
    }
    return this.sortedFeats[type].length > 5;
  }

  isMoreThanOneTypeOfFeat(): boolean {
    return Object.keys(this.sortedFeats).length > 1;
  }
}
