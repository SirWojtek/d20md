import {Component} from '@angular/core';
import {FavouritesService} from '../../shared/favourites.service';
import {EntityType} from '../../shared/model/entity';

@Component({
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent {
  favouritesEntitiesCountObs = this.favouritesService.getFavouritesCount();

  entityType = EntityType;

  constructor(private favouritesService: FavouritesService) {}
}
