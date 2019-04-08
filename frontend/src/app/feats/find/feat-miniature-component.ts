import {Component, Input} from '@angular/core';

import {Feat} from '../../shared/model/feat';
import {FavouritesService} from '../../shared/favourites.service';
import {EntityType} from '../../shared/model/entity';

@Component({
  selector: 'd20md-feat-miniature',
  templateUrl: './feat-miniature-component.html',
  styleUrls: ['./feat-miniature-component.scss'],
})
export class FeatMiniatureComponent {
  @Input()
  feat: Feat;
  @Input()
  searchPhrase: string;

  constructor(private favouritesService: FavouritesService) {}

  highlight(htmlText: string) {
    return this.searchPhrase
      ? htmlText.replace(
          new RegExp(this.searchPhrase, 'ig'),
          '<span class="highlight">$&</span>',
        )
      : htmlText;
  }

  onFavouritesClick() {
    if (this.feat.isInFavourites) {
      this.favouritesService
        .removeFromFavourites(this.feat.id, EntityType.Feat)
        .subscribe(() => (this.feat.isInFavourites = false));
    } else {
      this.favouritesService
        .addToFavourites(this.feat.id, EntityType.Feat)
        .subscribe(() => (this.feat.isInFavourites = true));
    }
  }
}
