import {Component, HostListener} from '@angular/core';
import * as _ from 'lodash';

import {Monster} from '../../shared/model/monster';
import {FindMonsterService} from './find-monster.service';
import {slideInOutRight} from '../../shared/animations';

@Component({
  templateUrl: './find-monsters.component.html',
  styleUrls: ['./find-monsters.component.scss'],
  animations: [slideInOutRight],
})
export class FindMonstersComponent {
  hideFilters = false;

  searchFields = {
    name: '',
    size: '',
    type: '',
  };
  tagFields = {
    environment_tags: [],
  };
  sortMap = {asc: [], desc: []};
  page = {
    current: 1,
    total: 0,
    size: 6,
  };

  results: Monster[] = [];

  debouncePeriod = 250;
  onQueryChange = _.debounce(() => {
    this.search();
  }, this.debouncePeriod);

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 1200) {
      return;
    }

    this.hideFilters = false;
  }

  constructor(private findService: FindMonsterService) {
    this.search();
  }

  onSortChange(sortMap: any) {
    this.sortMap = sortMap;
    this.onQueryChange();
  }

  onSearchTermChange(field: string, value: string) {
    this.page.current = 1;
    this.searchFields[field] = value;
    this.onQueryChange();
  }

  onSearchTermRangeChange(field: string, value: number[]) {
    if (value.length !== 2) {
      throw Error('Wrong size of range list');
    }

    this.page.current = 1;
    this.searchFields[field] = {
      min: value[0],
      max: value[1],
    };
    this.onQueryChange();
  }

  onSearchTermTagsChange(field: string, tags: string[]) {
    this.page.current = 1;
    this.tagFields[field] = tags;
    this.onQueryChange();
  }

  private search() {
    const offset = (this.page.current - 1) * this.page.size;
    const limit = this.page.size;
    this.findService
      .findMonsters({
        fields: this.searchFields,
        environment_tags: this.tagFields.environment_tags,
        offset,
        limit,
        asc: this.sortMap.asc || [],
        desc: this.sortMap.desc || [],
      })
      .subscribe(result => {
        this.results = result.rows;
        this.page.total = result.count;
      });
  }
}
