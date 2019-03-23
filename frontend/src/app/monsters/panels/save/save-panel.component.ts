import {Component, Input, OnInit} from '@angular/core';

import {Save} from '../../../shared/model/save';
import {toJson} from '../../../shared/model/conversions';

import {MonstersService} from '../../monsters.service';

@Component({
  selector: 'd20md-save-panel',
  templateUrl: './save-panel.component.html',
})
export class SavePanelComponent implements OnInit {
  @Input()
  monsterId: number;
  @Input()
  canModify: boolean;

  save: Save;

  constructor(private monstersService: MonstersService) {
    this.monstersService
      .getHasChangedObservable()
      .subscribe(() => this.ngOnInit());
  }

  ngOnInit() {
    this.monstersService
      .getMonster(this.monsterId, 'basic')
      .subscribe(monster => (this.save = monster.Save));
  }

  onSaveChange(newVal: Save) {
    this.monstersService
      .updateMonster({id: this.monsterId, Save: toJson(newVal)}, 'basic')
      .subscribe(updated => (this.save = updated.Save));
  }
}
