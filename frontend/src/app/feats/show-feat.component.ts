import {Component, OnInit} from '@angular/core';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatAll';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Feat} from '../shared/model/feat';
import {UserService} from '../shared/user/user.service';
import {FeatsService} from './feats.service';
import {FavouritesService} from '../shared/favourites.service';
import {EntityType} from '../shared/model/entity';

@Component({
  templateUrl: './show-feat.component.html',
  styleUrls: ['./show-feat.component.scss'],
})
export class ShowFeatComponent implements OnInit {
  featObs: Observable<Feat>;
  canModify: boolean;

  private featSubject = new ReplaySubject<Feat>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private featsService: FeatsService,
    private userService: UserService,
    private favouritesService: FavouritesService,
  ) {
    this.featObs = this.featSubject.asObservable();
  }

  ngOnInit() {
    this.route.params
      .flatMap(params => this.featsService.getFeat(+params['id']))
      .subscribe(feat => {
        this.titleService.setTitle('d20MD - View Feat - ' + feat.name);
        this.featSubject.next(feat);
        this.setCanModify(feat);
      });
  }

  onFavouritesClick(feat: Feat) {
    if (feat.isInFavourites) {
      this.favouritesService
        .removeFromFavourites(feat.id, EntityType.Feat)
        .flatMap(() => this.featsService.getFeat(feat.id))
        .subscribe(updated => this.featSubject.next(updated));
    } else {
      this.favouritesService
        .addToFavourites(feat.id, EntityType.Feat)
        .flatMap(() => this.featsService.getFeat(feat.id))
        .subscribe(updated => this.featSubject.next(updated));
    }
  }

  onFeatTypeSave(id: number, feat_type: string) {
    this.featsService
      .updateFeat({id, feat_type})
      .subscribe(feat => this.featSubject.next(feat));
  }

  onPrerequisitesSave(id: number, prerequisites: Feat[]) {
    this.featsService
      .updateFeat({
        id,
        Prerequisite: prerequisites,
      })
      .subscribe(feat => this.featSubject.next(feat));
  }

  onBenefitSave(id: number, benefit: string) {
    this.featsService
      .updateFeat({id, benefit})
      .subscribe(feat => this.featSubject.next(feat));
  }

  onNormalSave(id: number, normal: string) {
    this.featsService
      .updateFeat({id, normal})
      .subscribe(feat => this.featSubject.next(feat));
  }

  onSpecialSave(id: number, special: string) {
    this.featsService
      .updateFeat({id, special})
      .subscribe(feat => this.featSubject.next(feat));
  }

  onDeleteFeat(id: number) {
    this.featsService.deleteFeat(id).subscribe(() => {
      this.router.navigateByUrl('feats/find');
    });
  }

  private setCanModify(feat: Feat) {
    this.userService.canEdit(feat).subscribe((canEdit: boolean) => {
      this.canModify = canEdit;
    });
  }
}
