import { Component, Input, OnChanges } from '@angular/core';
import { Skill } from '../../../shared/model/skill';
import { chromaColor } from '../../../shared/chroma-color';

@Component({
  selector: 'd20md-show-skill',
  templateUrl: './show-skill.component.html',
  styleUrls: ['./show-skill.component.scss']
})
export class ShowSkillComponent implements OnChanges {
  @Input() skill: Skill;
  @Input() viewOnly = false;

  skills: string[];
  showNotLearnedSkills = false;
  sortByRank = false;

  private skillColor = chromaColor([-10, 0, 5, 15, 30]);

  ngOnChanges(changes: any) {
    if (!changes['skill'] || !changes['skill'].currentValue) {
      return;
    }

    this.skill = changes['skill'].currentValue;
    this.createSkills();
  }

  getColor(skillName: string) {
    return this.skillColor(this.skill.total[skillName]);
  }

  createSkills() {
    let params = this.showNotLearnedSkills
      ? this.skill.getParams()
      : this.skill.getParams().filter(param => this.skill[param]);

    if (this.sortByRank) {
      params = params.sort((a, b) => this.skill.total[b] - this.skill.total[a]);
    }

    this.skills = params;
  }
}
