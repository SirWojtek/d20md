import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {Monster} from '../../../shared/model/monster';
import {FavouritesService} from '../../../shared/favourites.service';
import {EntityType} from '../../../shared/model/entity';

const DEBOUNCE_TIME = 300;

@Component({
  templateUrl: './favourite-monsters.component.html',
  styleUrls: ['../favourites-common.scss'],
})
export class FavouriteMonstersComponent {
  nameControl = this.formBuilder.control('');
  paginationControl = this.formBuilder.control(1);

  dataObs: Observable<{count: number; items: Monster[]}>;

  itemsPerPage = 10;

  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private favouritesService: FavouritesService,
  ) {
    this.subscription.add(
      Observable.combineLatest([
        this.nameControl.valueChanges
          .distinctUntilChanged()
          .debounceTime(DEBOUNCE_TIME),
        this.paginationControl.valueChanges.distinctUntilChanged(),
      ]).subscribe(([name, page]) => this.query(name, page)),
    );

    // NOTE: triggers for initial values
    this.resetForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onRemoveFromFavourites(id: number) {
    this.favouritesService
      .removeFromFavourites(id, EntityType.Monster)
      .subscribe(() => this.resetForm(), console.error);
  }

  private resetForm() {
    this.nameControl.setValue('');
    this.paginationControl.setValue(1);
  }

  private query(name: string, page: number) {
    const offset = (page - 1) * this.itemsPerPage;
    const limit = this.itemsPerPage;

    this.dataObs = this.favouritesService.getMonsterFavourites(
      name,
      offset,
      limit,
    );
  }
}
