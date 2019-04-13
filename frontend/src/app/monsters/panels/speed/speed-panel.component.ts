import {Component} from '@angular/core';

import {Speed} from '../../../shared/model/speed';
import {toJson} from '../../../shared/model/conversions';

import {MonstersService} from '../../monsters.service';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../shared/user/user.service';

@Component({
  selector: 'd20md-speed-panel',
  template: `
  <div *ngIf="speedObs | async as speed">
    <d20md-show-speed [speed]="speed"></d20md-show-speed>
    <div *ngIf="canModifyObs | async" class="edit-button">
      <button type="button" class="btn btn-default" (click)="speedForm.show(speed)">Edit</button>
    </div>
    <d20md-speed-form #speedForm (speedChange)="onSpeedChange($event)"></d20md-speed-form>
  </div>
  `,
})
export class SpeedPanelComponent {
  speedObs: Observable<Speed>;
  canModifyObs: Observable<boolean>;

  private monsterId: number;

  constructor(
    private route: ActivatedRoute,
    private monstersService: MonstersService,
    private userService: UserService,
  ) {
    const monsterObs = this.route.parent.params
      .flatMap(params =>
        this.monstersService.getMonster(+params['id'], 'movement'),
      )
      .do(monster => (this.monsterId = monster.id))
      .publishReplay(1)
      .refCount();

    this.speedObs = monsterObs.map(monster => monster.Speed);

    this.canModifyObs = monsterObs.flatMap(monster =>
      this.userService.canEdit(monster),
    );
  }

  onSpeedChange(newVal: Speed) {
    this.speedObs = this.monstersService
      .updateMonster({id: this.monsterId, Speed: toJson(newVal)}, 'movement')
      .map(monster => monster.Speed);
  }
}
