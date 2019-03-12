import {Component} from '@angular/core';

import {Skill} from '../../../shared/model/skill';
import {toJson} from '../../../shared/model/conversions';

import {MonstersService} from '../../monsters.service';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../shared/user/user.service';

@Component({
  selector: 'd20md-skill-panel',
  template: `
  <div *ngIf="skillObs | async as skill">
    <d20md-show-skill [skill]="skill"></d20md-show-skill>
    <div *ngIf="canModifyObs | async" class="edit-button">
      <button type="button" class="btn btn-default" (click)="skillForm.show(skill)">Edit</button>
    </div>
    <d20md-skill-form #skillForm (skillChange)="onSkillChange($event)"></d20md-skill-form>
  </div>
  `,
})
export class SkillPanelComponent {
  skillObs: Observable<Skill>;
  canModifyObs: Observable<boolean>;

  private monsterId: number;

  constructor(
    private route: ActivatedRoute,
    private monstersService: MonstersService,
    private userService: UserService,
  ) {
    const monsterObs = this.route.parent.params
      .flatMap(params =>
        this.monstersService.getMonster(+params['id'], 'skills'),
      )
      .do(monster => (this.monsterId = monster.id))
      .publishReplay(1)
      .refCount();

    this.skillObs = monsterObs.map(monster => monster.Skill);

    this.canModifyObs = monsterObs.flatMap(monster =>
      this.userService.canEdit(monster),
    );
  }

  onSkillChange(newSkill: Skill) {
    this.skillObs = this.monstersService
      .updateMonster({id: this.monsterId, Skill: toJson(newSkill)})
      .map(monster => monster.Skill);
  }
}
