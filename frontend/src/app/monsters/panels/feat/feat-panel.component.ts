import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';

import {Feat} from '../../../shared/model/feat';

import {MonstersService} from '../../monsters.service';
import {UserService} from '../../../shared/user/user.service';
import {toJson} from '../../../shared/model/conversions';

@Component({
  selector: 'd20md-feat-panel',
  template: `
  <div *ngIf="featsObs | async as feats">
    <d20md-show-feats [feats]="feats"></d20md-show-feats>
    <div *ngIf="canModifyObs | async" class="edit-button">
      <button type="button" class="btn btn-default" (click)="featForm.show(feats)">Edit</button>
    </div>
    <d20md-feat-form #featForm (featsChange)="onFeatChange($event)"
    ></d20md-feat-form>
  </div>
  `,
})
export class FeatPanelComponent {
  featsObs: Observable<Feat[]>;
  canModifyObs: Observable<boolean>;

  private monsterId: number;

  constructor(
    private route: ActivatedRoute,
    private monstersService: MonstersService,
    private userService: UserService,
  ) {
    const monsterObs = this.route.parent.params
      .flatMap(params =>
        this.monstersService.getMonster(+params['id'], 'feats'),
      )
      .do(monster => (this.monsterId = monster.id))
      .publishReplay(1)
      .refCount();

    this.featsObs = monsterObs.map(monster => monster.Feats);

    this.canModifyObs = monsterObs.flatMap(monster =>
      this.userService.canEdit(monster),
    );
  }

  onFeatChange(newFeats: Feat[]) {
    this.featsObs = this.monstersService
      .updateMonster({id: this.monsterId, Feats: newFeats.map(toJson)}, 'feats')
      .map(monster => monster.Feats);
  }
}
