import {Component, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Spell} from '../../../shared/model/spell';
import {Subscription} from 'rxjs/Subscription';
import {FormBuilder} from '@angular/forms';
import {FavouritesService} from '../../../shared/favourites.service';
import {EnumService} from '../../../shared/enum.service';
import {EntityType} from '../../../shared/model/entity';

const DEBOUNCE_TIME = 300;

@Component({
  templateUrl: './favourite-spells.component.html',
  styleUrls: ['../favourites-common.scss'],
})
export class FavouriteSpellsComponent implements OnDestroy {
  nameControl = this.formBuilder.control('');
  typeControl = this.formBuilder.control('');
  paginationControl = this.formBuilder.control(1);

  dataObs: Observable<{count: number; items: Spell[]}>;
  spellTypes: Observable<string[]> = this.enumService.getSpellTypes();

  itemsPerPage = 10;

  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private favouritesService: FavouritesService,
    private enumService: EnumService,
  ) {
    this.subscription.add(
      Observable.combineLatest([
        this.nameControl.valueChanges
          .distinctUntilChanged()
          .debounceTime(DEBOUNCE_TIME),
        this.typeControl.valueChanges.distinctUntilChanged(),
        this.paginationControl.valueChanges.distinctUntilChanged(),
      ]).subscribe(([name, type, page]) => this.query(name, type, page)),
    );

    // NOTE: triggers for initial values
    this.resetForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onRemoveFromFavourites(id: number) {
    this.favouritesService
      .removeFromFavourites(id, EntityType.Spell)
      .subscribe(() => this.resetForm(), console.error);
  }

  private resetForm() {
    this.nameControl.setValue('');
    this.typeControl.setValue('');
    this.paginationControl.setValue(1);
  }

  private query(name: string, type: string, page: number) {
    const offset = (page - 1) * this.itemsPerPage;
    const limit = this.itemsPerPage;

    this.dataObs = this.favouritesService.getSpellFavourites(
      name,
      type,
      offset,
      limit,
    );
  }
}
