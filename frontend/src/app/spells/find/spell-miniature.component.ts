import {Component, Input} from '@angular/core';

import {Spell} from '../../shared/model/spell';
import {FavouritesService} from '../../shared/favourites.service';
import {EntityType} from '../../shared/model/entity';

@Component({
  selector: 'd20md-spell-miniature',
  templateUrl: './spell-miniature.component.html',
  styleUrls: ['./spell-miniature.component.scss'],
})
export class SpellMiniatureComponent {
  @Input()
  spell: Spell;

  constructor(private favouritesService: FavouritesService) {}

  onFavouritesClick() {
    if (this.spell.isInFavourites) {
      this.favouritesService
        .removeFromFavourites(this.spell.id, EntityType.Spell)
        .subscribe(() => (this.spell.isInFavourites = false));
    } else {
      this.favouritesService
        .addToFavourites(this.spell.id, EntityType.Spell)
        .subscribe(() => (this.spell.isInFavourites = true));
    }
  }
}
