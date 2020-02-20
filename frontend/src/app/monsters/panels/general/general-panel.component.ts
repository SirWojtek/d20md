import { Component, Input, OnInit } from '@angular/core';

import { MonstersService } from '../../monsters.service';
import { chromaColor } from '../../../shared/chroma-color';
import { Monster } from '../../../shared/model/monster';
import { Image } from '../../../shared/model/image';
import { toJson } from '../../../shared/model/conversions';

@Component({
  selector: 'd20md-general-panel',
  templateUrl: './general-panel.component.html',
  styleUrls: ['./general-panel.component.scss']
})
export class GeneralPanelComponent implements OnInit {
  @Input()
  monsterId: number;
  @Input()
  canModify: boolean;
  @Input()
  viewOnly = false;

  monster: Monster;

  initiativeColors = chromaColor([-100, 0, 10, 50, 100]);

  constructor(private monstersService: MonstersService) {
    this.monstersService
      .getHasChangedObservable()
      .subscribe(() => this.ngOnInit());
  }

  ngOnInit() {
    this.monstersService
      .getMonster(this.monsterId, 'basic')
      .subscribe(monster => (this.monster = monster));
  }

  onImageChange(newVal: Image) {
    this.monster.Image = newVal;
  }

  onChange(monster: Monster) {
    this.monstersService
      .updateMonster(toJson(monster), 'basic')
      .subscribe(updated => (this.monster = updated));
  }
}
