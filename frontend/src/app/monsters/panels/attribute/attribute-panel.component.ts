import {Component} from '@angular/core';

import {Attribute} from '../../../shared/model/attribute';
import {toJson} from '../../../shared/model/conversions';

import {MonstersService} from '../../monsters.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../../../shared/user/user.service';

@Component({
  selector: 'd20md-attribute-panel',
  template: `
  <div *ngIf="attributesObs | async as attributes">
    <d20md-show-attribute [attribute]="attributes"></d20md-show-attribute>
    <div *ngIf="canModifyObs | async" class="edit-button">
      <button type="button" class="btn btn-default" (click)="editor.show(attributes)">Edit</button>
    </div>
    <d20md-attribute-form #editor
      (attributeChange)="onAttributeChange($event)"
    ></d20md-attribute-form>
  </div>
  `,
})
export class AttributePanelComponent {
  canModifyObs: Observable<boolean>;
  attributesObs: Observable<Attribute>;

  private monsterId: number;

  constructor(
    private route: ActivatedRoute,
    private monstersService: MonstersService,
    private userService: UserService,
  ) {
    this.monstersService.getHasChangedObservable().subscribe(() => this.init());

    this.init();
  }

  onAttributeChange(newVal: Attribute) {
    this.attributesObs = this.monstersService
      .updateMonster({id: this.monsterId, Attribute: toJson(newVal)})
      .map(monster => monster.Attribute);
  }

  private init() {
    const monsterObs = this.route.parent.params
      .flatMap(params =>
        this.monstersService.getMonster(+params['id'], 'attributes'),
      )
      .do(monster => (this.monsterId = monster.id))
      .publishReplay(1)
      .refCount();

    (this.attributesObs = monsterObs.map(monster => monster.Attribute)),
      (this.canModifyObs = monsterObs.flatMap(monster =>
        this.userService.canEdit(monster),
      ));
  }
}
