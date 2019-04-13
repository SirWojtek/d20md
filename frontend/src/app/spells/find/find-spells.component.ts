import {Component, HostListener} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import * as _ from 'lodash';

import {Spell} from '../../shared/model/spell';
import {EnumService} from '../../shared/enum.service';
import {Utils} from '../../shared/utils';

import {FindSpellService} from './find-spell.service';
import {slideInOutRight} from '../../shared/animations';

@Component({
  templateUrl: './find-spells.component.html',
  styleUrls: ['./find-spells.component.scss'],
  animations: [slideInOutRight],
})
export class FindSpellsComponent {
  hideFilters = false;

  levelRange = [0, 9];
  searchFields = {
    name: '',
    spell_type: '',
    spell_range: '',
    class_name: '',
    level: {min: 0, max: 9},
  };

  sortMap = {
    asc: [],
    desc: [],
  };

  page = {
    current: 1,
    total: 0,
    size: 6,
  };

  spells: Spell[] = [];

  spellTypes: Observable<{[index: string]: string}>;
  spellRanges: Observable<{[index: string]: string}>;

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

  constructor(
    private findSpellService: FindSpellService,
    enumService: EnumService,
  ) {
    this.spellTypes = enumService
      .getSpellTypes()
      .map(Utils.createUpperCaseToNoUpperCaseMap)
      .map(types => {
        types['Any'] = '';
        return types;
      });
    this.spellRanges = enumService
      .getSpellRanges()
      .map(Utils.createUpperCaseToNoUpperCaseMap)
      .map(ranges => {
        ranges['Any'] = '';
        return ranges;
      });

    this.search();
  }

  onFilterChange() {
    this.page.current = 1;
    this.onQueryChange();
  }

  onSortChange(field: string, sortType: string) {
    this.removeFieldFromSortMap(field);
    if (sortType) {
      this.sortMap[sortType].push(field);
    }

    this.search();
  }

  onLevelChange() {
    if (this.levelRange.length !== 2) {
      throw Error('Invalid length of level array');
    }

    this.page.current = 1;
    this.searchFields.level.min = this.levelRange[0];
    this.searchFields.level.max = this.levelRange[1];

    this.onQueryChange();
  }

  private search() {
    const offset = (this.page.current - 1) * this.page.size;
    const limit = this.page.size;
    this.findSpellService
      .findSpells({
        fields: this.searchFields,
        offset,
        limit,
        asc: this.sortMap.asc || [],
        desc: this.sortMap.desc || [],
      })
      .subscribe(result => {
        this.spells = result.filtered;
        this.page.total = result.total;
      });
  }

  private removeFieldFromSortMap(field: string) {
    let index = this.sortMap['asc'].indexOf(field);
    if (index !== -1) {
      this.sortMap['asc'].splice(index, 1);
      return;
    }
    index = this.sortMap['desc'].indexOf(field);
    if (index !== -1) {
      this.sortMap['desc'].splice(index, 1);
      return;
    }
  }
}
