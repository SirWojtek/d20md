import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {QuickSearchService} from './quick-search.service';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {IEntity, EntityType} from '../../shared/model/entity';
import {getEntityShowPageLink} from '../../shared/links';

const DEBOUNCE_TIME = 300;

@Component({
  selector: 'd20md-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  searchControl = this.formBuilder.control('');
  searchResults: Observable<IEntity[]>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private quickSearchService: QuickSearchService,
  ) {
    this.initSearch();
  }

  onSelect(res: IEntity) {
    this.router.navigate([getEntityShowPageLink(res)]);
    this.searchControl.setValue('');
  }

  private initSearch() {
    this.searchResults = this.searchControl.valueChanges
      .debounceTime(DEBOUNCE_TIME)
      .flatMap(val => {
        if (!val || val.length < 3) {
          return Observable.of({monsters: [], spells: [], feats: []});
        }
        return this.quickSearchService.search(val);
      })
      .map(results => {
        const monsters: IEntity[] = results.monsters.map(m => ({
          id: m.id,
          name: m.name,
          type: EntityType.Monster,
        }));
        const spells: IEntity[] = results.spells.map(m => ({
          id: m.id,
          name: m.name,
          type: EntityType.Spell,
        }));
        const feats: IEntity[] = results.feats.map(m => ({
          id: m.id,
          name: m.name,
          type: EntityType.Feat,
        }));

        return [...monsters, ...spells, ...feats].sort(
          (r1, r2) => r1.name.length - r2.name.length,
        );
      });
  }
}
