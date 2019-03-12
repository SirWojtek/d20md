import {Component, ViewChild} from '@angular/core';
import {clone} from 'lodash';

import {SpecialAbility} from '../../../shared/model/special-ability';
import {toJson} from '../../../shared/model/conversions';
import {Utils} from '../../../shared/utils';

import {SpecialFormComponent} from './special-form.component';
import {MonstersService} from '../../monsters.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../shared/user/user.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'd20md-special-panel',
  templateUrl: './special-panel.component.html',
  styleUrls: ['./special-panel.component.scss'],
})
export class SpecialPanelComponent {
  set specials(newVal: SpecialAbility[]) {
    if (newVal === this._specials) {
      return;
    }
    this._specials = newVal;

    this.page.total = this.specials.length;
    this.onPageChange();
  }
  get specials() {
    return this._specials;
  }

  canModifyObs: Observable<boolean>;

  @ViewChild(SpecialFormComponent)
  specialForm: SpecialFormComponent;

  page = {
    current: 1,
    total: 0,
    size: 5,
  };
  specialPage: SpecialAbility[] = [];

  editedSpecial: number = null;

  utils = Utils;

  private _specials: SpecialAbility[] = [];

  private monsterId: number;

  constructor(
    private route: ActivatedRoute,
    private monstersService: MonstersService,
    private userService: UserService,
  ) {
    const monsterObs = this.route.parent.params
      .flatMap(params =>
        this.monstersService.getMonster(+params['id'], 'special'),
      )
      .do(monster => (this.monsterId = monster.id))
      .publishReplay(1)
      .refCount();

    monsterObs
      .map(monster => monster.Specials)
      .subscribe(specials => (this.specials = specials));

    this.canModifyObs = monsterObs
      .flatMap(monster => this.userService.canEdit(monster))
      .publishReplay(1)
      .refCount();
  }

  onSpecialEdit(special: SpecialAbility) {
    const index = this.specials.indexOf(special);
    if (index === -1) {
      throw Error('Cannot find special for edit');
    }

    this.editedSpecial = index;
    this.specialForm.show(clone(special));
  }

  onSpecialDelete(special: SpecialAbility) {
    const index = this.specials.indexOf(special);
    if (index === -1) {
      return;
    }

    this.specials.splice(index, 1);
    this.specialsChanged();
  }

  onSpecialChange(newVal: SpecialAbility) {
    this.specials[this.editedSpecial] = newVal;
    this.editedSpecial = null;
    this.specialsChanged();
  }

  onSpecialAdd(special: SpecialAbility) {
    this.specials.push(special);
    this.specialsChanged();
  }

  onPageChange() {
    const offset = (this.page.current - 1) * this.page.size;
    const limit = this.page.size;

    this.specialPage = this.specials.slice(offset, offset + limit);
  }

  private specialsChanged() {
    this.monstersService
      .updateMonster({id: this.monsterId, Specials: this.specials.map(toJson)})
      .subscribe(updated => (this.specials = updated.Specials));
  }
}
