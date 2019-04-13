import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatAll';

import {Monster} from '../shared/model/monster';
import {UserService} from '../shared/user/user.service';
import {MonstersService} from './monsters.service';
import {FavouritesService} from '../shared/favourites.service';
import {EntityType} from '../shared/model/entity';

@Component({
  templateUrl: './show-monster.component.html',
  styleUrls: ['./show-monster.component.scss'],
})
export class ShowMonsterComponent implements OnInit, OnDestroy {
  monster: Monster;
  canModify: boolean;

  private routeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private monstersService: MonstersService,
    private userService: UserService,
    private favouritesService: FavouritesService,
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params
      .flatMap(params =>
        this.monstersService.getMonster(+params['id'], 'basic'),
      )
      .subscribe((monster: Monster) => {
        this.monster = monster;
        this.titleService.setTitle(
          'd20MD - View Monsters - ' + this.monster.name,
        );
        this.setPermisions();
      });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  onFavouritesClick() {
    if (this.monster.isInFavourites) {
      this.favouritesService
        .removeFromFavourites(this.monster.id, EntityType.Monster)
        .subscribe(() => {
          this.monster.isInFavourites = false;
          this.monster.favouritesCount -= 1;
        });
    } else {
      this.favouritesService
        .addToFavourites(this.monster.id, EntityType.Monster)
        .subscribe(() => {
          this.monster.isInFavourites = true;
          this.monster.favouritesCount += 1;
        });
    }
  }

  onDescriptionSave() {
    this.monstersService
      .updateMonster(
        {
          id: this.monster.id,
          description: this.monster.description,
        },
        'description',
      )
      .subscribe(updated => (this.monster.description = updated.description));
  }

  onFeatsSave() {
    this.monstersService
      .updateMonster({id: this.monster.id, Feats: this.monster.Feats}, 'feats')
      .subscribe(updated => (this.monster.Feats = updated.Feats));
  }

  onDeleteMonster() {
    this.monstersService
      .deleteMonster(this.monster.id)
      .subscribe(() => this.router.navigateByUrl('monsters/find'));
  }

  private setPermisions() {
    this.userService
      .canEdit(this.monster)
      .subscribe(canEdit => (this.canModify = canEdit));
  }
}
