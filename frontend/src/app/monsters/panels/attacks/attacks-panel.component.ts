import {Component} from '@angular/core';

import {AttackGroup} from '../../../shared/model/attack-group';
import {toJson} from '../../../shared/model/conversions';

import {MonstersService} from '../../monsters.service';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../shared/user/user.service';

@Component({
  selector: 'd20md-attacks-panel',
  template: `
  <div *ngIf="attackGroupsObs | async as attackGroups">
    <d20md-show-attacks [attackGroups]="attackGroups"></d20md-show-attacks>
    <div *ngIf="canModifyObs | async" class="edit-button">
      <button type="button" class="btn btn-default" (click)="editor.show(attackGroups)">Edit</button>
    </div>
    <d20md-attack-group-editor #editor
      (attackGroupsChange)="onAttackGroupChange($event)"
    ></d20md-attack-group-editor>
  </div>
  `,
})
export class AttacksPanelComponent {
  attackGroupsObs: Observable<AttackGroup[]>;
  canModifyObs: Observable<boolean>;

  private monsterId: number;

  constructor(
    private route: ActivatedRoute,
    private monstersService: MonstersService,
    private userService: UserService,
  ) {
    const monsterObs = this.route.parent.params
      .flatMap(params =>
        this.monstersService.getMonster(+params['id'], 'attacks'),
      )
      .do(monster => (this.monsterId = monster.id))
      .publishReplay(1)
      .refCount();

    this.attackGroupsObs = monsterObs.map(monster => monster.AttackGroups);

    this.canModifyObs = monsterObs.flatMap(monster =>
      this.userService.canEdit(monster),
    );
  }

  onAttackGroupChange(newVal: AttackGroup[]) {
    this.attackGroupsObs = this.monstersService
      .updateMonster({id: this.monsterId, AttackGroups: newVal.map(toJson)})
      .map(monster => monster.AttackGroups);
  }
}
