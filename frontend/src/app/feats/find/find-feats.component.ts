import {Component} from '@angular/core';
import * as _ from 'lodash';

import {Feat} from '../../shared/model/feat';
import {FindFeatService} from './find-feat.service';
import {EnumService} from '../../shared/enum.service';
import {Observable} from 'rxjs/Observable';
import {Utils} from '../../shared/utils';
import {slideInOutRight} from '../../shared/animations';

@Component({
  templateUrl: './find-feats.component.html',
  styleUrls: ['./find-feats.component.scss'],
  animations: [slideInOutRight],
})
export class FindFeatsComponent {
  searchFields = {
    phrase: '',
    feat_type: '',
  };

  page = {
    current: 1,
    total: 0,
    size: 4,
  };

  featTypes: Observable<{[index: string]: string}>;

  feats: Feat[] = [];

  debouncePeriod = 250;
  onQueryChange = _.debounce(() => {
    this.search();
  }, this.debouncePeriod);

  constructor(
    private findFeatService: FindFeatService,
    enumService: EnumService,
  ) {
    this.featTypes = enumService
      .getFeatTypes()
      .map(Utils.createUpperCaseToNoUpperCaseMap)
      .map(types => {
        types['Any'] = '';
        return types;
      });
    this.search();
  }

  onFilterChange() {
    this.page.current = 1;
    this.onQueryChange();
  }

  private search() {
    const offset = (this.page.current - 1) * this.page.size;
    const limit = this.page.size;
    this.findFeatService
      .findFeats(this.searchFields, offset, limit)
      .subscribe(result => {
        this.feats = result.filtered;
        this.page.total = result.total;
      });
  }
}
