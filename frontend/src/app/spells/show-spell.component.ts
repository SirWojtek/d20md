import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatAll';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Spell} from '../shared/model/spell';
import {UserService} from '../shared/user/user.service';
import {SpellsService} from './spells.service';
import {SpellLevel} from '../shared/model/spell-level';

@Component({
  templateUrl: './show-spell.component.html',
})
export class ShowSpellComponent implements OnInit {
  spellObs: Observable<Spell>;
  canModify: boolean;

  private spellId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private spellsService: SpellsService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.spellObs = this.route.params
      .flatMap(params => this.spellsService.getSpell(+params['id'], 'basic'))
      .do(spell => {
        this.titleService.setTitle('d20MD - View Spells - ' + spell.name);
        this.setCanModify(spell);
        this.spellId = spell.id;
      });
  }

  onSpellResistableChange(permits_sr: boolean) {
    this.spellObs = this.spellsService.updateSpell({
      id: this.spellId,
      permits_sr,
    });
  }

  onSaveChange(save_type: string) {
    this.spellObs = this.spellsService.updateSpell({
      id: this.spellId,
      save_type,
    });
  }

  onSpellLevelsChange(spellLevels: SpellLevel[]) {
    this.spellObs = this.spellsService.updateSpell({
      id: this.spellId,
      SpellLevels: spellLevels,
    });
  }

  onSpellTypeChange(spell_type: string) {
    this.spellObs = this.spellsService.updateSpell({
      id: this.spellId,
      spell_type,
    });
  }

  onSpellRangeChange(spell_range: string) {
    this.spellObs = this.spellsService.updateSpell({
      id: this.spellId,
      spell_range,
    });
  }

  onDescriptionChange(description: string) {
    this.spellObs = this.spellsService.updateSpell({
      id: this.spellId,
      description,
    });
  }

  onDeleteSpell() {
    this.spellsService.deleteSpell(this.spellId).subscribe(() => {
      this.router.navigateByUrl('spells/find');
    });
  }

  private setCanModify(spell: Spell) {
    this.userService.canEdit(spell).subscribe((canEdit: boolean) => {
      this.canModify = canEdit;
    });
  }
}
