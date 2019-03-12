import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatAll';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Feat} from '../shared/model/feat';
import {UserService} from '../shared/user/user.service';
import {FeatsService} from './feats.service';

@Component({
  templateUrl: './show-feat.component.html',
  styleUrls: ['./show-feat.component.scss'],
})
export class ShowFeatComponent implements OnInit {
  featObs: Observable<Feat>;
  canModify: boolean;

  private featId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private featsService: FeatsService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.featObs = this.route.params
      .flatMap(params => this.featsService.getFeat(+params['id'], 'basic'))
      .do(feat => {
        this.featId = feat.id;
        this.titleService.setTitle('d20MD - View Feat - ' + feat.name);
        this.setCanModify(feat);
      });
  }

  onFeatTypeSave(feat_type: string) {
    this.featObs = this.featsService.updateFeat({id: this.featId, feat_type});
  }

  onPrerequisitesSave(prerequisites: Feat[]) {
    this.featObs = this.featsService.updateFeat({
      id: this.featId,
      Prerequisite: prerequisites,
    });
  }

  onBenefitSave(benefit: string) {
    this.featObs = this.featsService.updateFeat({id: this.featId, benefit});
  }

  onNormalSave(normal: string) {
    this.featObs = this.featsService.updateFeat({id: this.featId, normal});
  }

  onSpecialSave(special: string) {
    this.featObs = this.featsService.updateFeat({id: this.featId, special});
  }

  onDeleteFeat() {
    this.featsService.deleteFeat(this.featId).subscribe(() => {
      this.router.navigateByUrl('feats/find');
    });
  }

  private setCanModify(feat: Feat) {
    this.userService.canEdit(feat).subscribe((canEdit: boolean) => {
      this.canModify = canEdit;
    });
  }
}
