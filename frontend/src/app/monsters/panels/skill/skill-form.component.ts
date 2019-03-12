import { Component, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { Skill } from '../../../shared/model/skill';
import { ModalFormComponent } from '../../../shared/elements/modal-form/modal-form.component';

@Component({
  selector: 'd20md-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: [ './skill-form.component.scss' ],
})

export class SkillFormComponent extends ModalFormComponent {
  @Output() skillChange = new EventEmitter<Skill>();
  trios: any[][] = [];

  showNotLearnedSkills = false;
  sortByRank = false;

  afterShow() {
    this.value = _.cloneDeep(this.value);
    this.createSkillTrios();
  }

  createSkillTrios() {
    let keysWithNames = this.value.getKeysWithNames();

    if (!this.showNotLearnedSkills) {
      keysWithNames = keysWithNames.filter(el => this.value[el.key]);
    }
    if (this.sortByRank) {
      keysWithNames = keysWithNames.sort(
        (a, b) => this.value[b.key] - this.value[a.key]);
    }

    this.trios = _.chunk(keysWithNames, 3);
  }

  onSave() {
    this.skillChange.emit(<Skill>this.value);
    return true;
  }
}
