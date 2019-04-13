import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';

import {MonstersService} from '../../monsters.service';
import {UserService} from '../../../shared/user/user.service';

@Component({
  template: `
  <d20md-description-panel
    [description]="description"
    (descriptionChange)="onDescriptionChange($event)"
    [canModify]="canModify"
  ><d20md-description-panel>
  `,
})
export class MonsterDescriptionPanelComponent implements OnDestroy {
  canModify: boolean;
  description: string;

  private monsterId: number;
  private subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private monstersService: MonstersService,
    private userService: UserService,
  ) {
    const monsterObs = this.route.parent.params
      .flatMap(params =>
        this.monstersService.getMonster(+params['id'], 'description'),
      )
      .do(monster => (this.monsterId = monster.id))
      .publishReplay(1)
      .refCount();

    this.subscription.add(
      monsterObs
        .map(monster => monster.description)
        .subscribe(description => (this.description = description)),
    );

    this.subscription.add(
      monsterObs
        .flatMap(monster => this.userService.canEdit(monster))
        .subscribe(canModify => {
          this.canModify = canModify;
        }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDescriptionChange(description: string) {
    this.subscription.add(
      this.monstersService
        .updateMonster({id: this.monsterId, description}, 'description')
        .map(monster => monster.description)
        .subscribe(desc => (this.description = desc)),
    );
  }
}
