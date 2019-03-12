import {Component} from '@angular/core';

import {Spell} from '../../../shared/model/spell';
import {toJson} from '../../../shared/model/conversions';

import {MonstersService} from '../../monsters.service';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../shared/user/user.service';

@Component({
  selector: 'd20md-spell-panel',
  template: `
  <div *ngIf="spellsObs | async as spells">
    <d20md-show-spells [spells]="spells"></d20md-show-spells>
    <div *ngIf="canModifyObs | async" class="edit-button">
      <button type="button" class="btn btn-default" (click)="spellForm.show(spells)">Edit</button>
    </div>
    <d20md-spell-form #spellForm
      (spellsChange)="onSpellsChange($event)"
    ></d20md-spell-form>
  </div>
  `,
})
export class SpellPanelComponent {
  spellsObs: Observable<Spell[]>;
  canModifyObs: Observable<boolean>;

  private monsterId: number;

  constructor(
    private route: ActivatedRoute,
    private monstersService: MonstersService,
    private userService: UserService,
  ) {
    const monsterObs = this.route.parent.params
      .flatMap(params =>
        this.monstersService.getMonster(+params['id'], 'spells'),
      )
      .do(monster => (this.monsterId = monster.id))
      .publishReplay(1)
      .refCount();

    this.spellsObs = monsterObs.map(monster => monster.Spells);

    this.canModifyObs = monsterObs.flatMap(monster =>
      this.userService.canEdit(monster),
    );
  }

  onSpellsChange(newSpells: Spell[]) {
    this.spellsObs = this.monstersService
      .updateMonster({id: this.monsterId, Spells: newSpells.map(toJson)})
      .map(monster => monster.Spells);
  }
}
