import {Component, Input, Output, EventEmitter} from '@angular/core';
import * as _ from 'lodash';

import {Spell} from '../../../shared/model/spell';
import {FindSpellService} from '../../../spells/find/find-spell.service';

@Component({
  selector: 'd20md-spell-editor',
  templateUrl: './spell-editor.component.html',
  styleUrls: ['./spell-editor.component.scss'],
})
export class SpellEditorComponent {
  private debouncePeriod = 300;

  @Input()
  spells: Spell[];
  @Output()
  spellsChange = new EventEmitter<Spell[]>();

  foundSpells: Spell[] = [];

  levelRange = [0, 9];
  searchFields = {
    name: '',
    class_name: '',
    level: {min: 0, max: 9},
  };

  onSearch = _.debounce(() => this.search(), this.debouncePeriod);

  constructor(private findSpellService: FindSpellService) {
    this.search();
  }

  onLevelChange() {
    if (this.levelRange.length !== 2) {
      throw Error('Invalid length of level array');
    }

    this.searchFields.level.min = this.levelRange[0];
    this.searchFields.level.max = this.levelRange[1];

    this.onSearch();
  }

  onDelete(spell: Spell) {
    const index = this.spells.indexOf(spell);
    if (index === -1) {
      throw new Error('Cannot find spell to remove');
    }
    this.spells.splice(index, 1);
    this.spellsChange.emit(this.spells);
  }

  isSpellAdded(spell: Spell): boolean {
    return !!this.spells.find(s => s.id === spell.id);
  }

  onAdd(spell: Spell) {
    this.spells.push(spell);
    this.spellsChange.emit(this.spells);
  }

  private search() {
    this.findSpellService
      .findSpells({
        fields: this.searchFields,
        offset: 0,
        limit: 10,
        asc: [],
        desc: ['name'],
      })
      .subscribe(res => (this.foundSpells = res.filtered));
  }
}
