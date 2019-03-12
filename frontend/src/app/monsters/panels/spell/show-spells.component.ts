import {Component, Input} from '@angular/core';
import {Spell} from '../../../shared/model/spell';
import {flatMap, uniqWith, isEqual, set} from 'lodash';
import {SpellLevel} from '../../../shared/model/spell-level';
import {FormBuilder} from '@angular/forms';

interface SortedSpells {
  // NOTE: first dimention is a spell level
  [type: string]: Spell[][];
}

@Component({
  selector: 'd20md-show-spells',
  templateUrl: './show-spells.component.html',
  styleUrls: ['./show-spells.component.scss'],
})
export class ShowSpellsComponent {
  @Input()
  set spells(val: Spell[]) {
    if (!val) {
      return;
    }

    this.sortSpells(val);

    const firstKey = Object.keys(this.sortedSpells)[0];
    this.typeControl.setValue(firstKey);
  }

  sortedSpells: SortedSpells = {};

  typeControl = this.formBuilder.control(null);
  levelControl = this.formBuilder.control(null);

  constructor(private formBuilder: FormBuilder) {
    this.typeControl.valueChanges.filter(type => !!type).subscribe(type => {
      const firstLevel = this.sortedSpells[type].findIndex(s => !!s);
      this.levelControl.setValue(firstLevel);
    });
  }

  isMoreThanOneTypeOfSpell(): boolean {
    return Object.keys(this.sortedSpells).length > 1;
  }

  getLevelsForType(): number[] {
    const type = this.typeControl.value;
    if (!type) {
      return [];
    }

    const spellsForType = this.sortedSpells[type];
    const indicies = [];
    for (let i = 0; i < spellsForType.length; i++) {
      if (!!spellsForType[i]) {
        indicies.push(i);
      }
    }
    return indicies;
  }

  getFilteredSpells(): Spell[] {
    const type = this.typeControl.value;
    const level = this.levelControl.value;

    if (!type || level === null) {
      return [];
    }

    return this.sortedSpells[type][level];
  }

  private sortSpells(spells: Spell[]) {
    const uniqueSpellLevels = uniqWith(
      flatMap(spells, s => s.SpellLevels),
      isEqual,
    );

    this.sortedSpells = uniqueSpellLevels.reduce((res, l) => {
      set(
        res,
        `${l.class_name}[${l.level}]`,
        this.findSpellsWithLevel(spells, l),
      );
      return {...res};
    }, {});
  }

  private findSpellsWithLevel(spells: Spell[], level: SpellLevel): Spell[] {
    return spells.filter(s => s.SpellLevels.some(l => isEqual(l, level)));
  }
}
