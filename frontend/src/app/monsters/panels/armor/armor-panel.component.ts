import {Component} from '@angular/core';

import {Armor} from '../../../shared/model/armor';
import {toJson} from '../../../shared/model/conversions';

import {MonstersService} from '../../monsters.service';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../shared/user/user.service';

@Component({
  selector: 'd20md-armor-panel',
  template: `
  <div *ngIf="armorObs | async as armor">
    <d20md-show-armor [armor]="armor"></d20md-show-armor>
    <div *ngIf="canModifyObs | async" class="edit-button">
      <button type="button" class="btn btn-default" (click)="editor.show(armor)">Edit</button>
    </div>
    <d20md-armor-form #editor
      (armorChange)="onArmorChange($event)"
    ></d20md-armor-form>
  </div>
  `,
})
export class ArmorPanelComponent {
  canModifyObs: Observable<boolean>;
  armorObs: Observable<Armor>;

  private monsterId: number;

  constructor(
    private route: ActivatedRoute,
    private monstersService: MonstersService,
    private userService: UserService,
  ) {
    const monsterObs = this.route.parent.params
      .flatMap(params =>
        this.monstersService.getMonster(+params['id'], 'defences'),
      )
      .do(monster => (this.monsterId = monster.id))
      .publishReplay(1)
      .refCount();

    this.armorObs = monsterObs.map(monster => monster.Armor);

    this.canModifyObs = monsterObs.flatMap(monster =>
      this.userService.canEdit(monster),
    );
  }

  onArmorChange(newVal: Armor) {
    this.armorObs = this.monstersService
      .updateMonster({id: this.monsterId, Armor: toJson(newVal)})
      .map(monster => monster.Armor);
  }
}
