import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Feat} from '../../../shared/model/feat';
import {FavouritesService} from '../../../shared/favourites.service';
import {EnumService} from '../../../shared/enum.service';
import {EntityType} from '../../../shared/model/entity';

const DEBOUNCE_TIME = 300;

@Component({
  templateUrl: './favourite-feats.component.html',
  styleUrls: ['../favourites-common.scss'],
})
export class FavouriteFeatsComponent {
  nameControl = this.formBuilder.control('');
  typeControl = this.formBuilder.control('');
  paginationControl = this.formBuilder.control(1);

  dataObs: Observable<{count: number; items: Feat[]}>;
  featTypes: Observable<string[]> = this.enumService.getFeatTypes();

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
      .removeFromFavourites(id, EntityType.Feat)
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

    this.dataObs = this.favouritesService.getFeatFavourites(
      name,
      type,
      offset,
      limit,
    );
  }
}
