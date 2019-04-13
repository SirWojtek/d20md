import {Component, Input} from '@angular/core';

import {Monster} from '../../shared/model/monster';
import {FavouritesService} from '../../shared/favourites.service';
import {EntityType} from '../../shared/model/entity';

@Component({
  selector: 'd20md-find-miniature',
  templateUrl: './find-miniature.component.html',
  styleUrls: ['./find-miniature.component.scss'],
})
export class FindMiniatureComponent {
  @Input()
  monster: Monster;

  constructor(private favouritesService: FavouritesService) {}

  onFavouritesClick() {
    if (this.monster.isInFavourites) {
      this.favouritesService
        .removeFromFavourites(this.monster.id, EntityType.Monster)
        .subscribe(() => (this.monster.isInFavourites = false));
    } else {
      this.favouritesService
        .addToFavourites(this.monster.id, EntityType.Monster)
        .subscribe(() => (this.monster.isInFavourites = true));
    }
  }
}
