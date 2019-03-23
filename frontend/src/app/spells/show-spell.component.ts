import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatAll';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Spell} from '../shared/model/spell';
import {UserService} from '../shared/user/user.service';
import {SpellsService} from './spells.service';
import {SpellLevel} from '../shared/model/spell-level';
import {FavouritesService} from '../shared/favourites.service';
import {EntityType} from '../shared/model/entity';

@Component({
  templateUrl: './show-spell.component.html',
  styleUrls: ['./show-spell.component.scss'],
})
export class ShowSpellComponent implements OnInit {
  spellObs: Observable<Spell>;
  canModify: boolean;

  private spellSubject = new ReplaySubject<Spell>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private spellsService: SpellsService,
    private userService: UserService,
    private favouritesService: FavouritesService,
  ) {
    this.spellObs = this.spellSubject.asObservable();
  }

  ngOnInit() {
    this.route.params
      .flatMap(params => this.spellsService.getSpell(+params['id']))
      .subscribe(spell => {
        this.titleService.setTitle('d20MD - View Spells - ' + spell.name);
        this.setCanModify(spell);
        this.spellSubject.next(spell);
      });
  }

  onFavouritesClick(spell: Spell) {
    if (spell.isInFavourites) {
      this.favouritesService
        .removeFromFavourites(spell.id, EntityType.Spell)
        .flatMap(() => this.spellsService.getSpell(spell.id))
        .subscribe(updated => this.spellSubject.next(updated));
    } else {
      this.favouritesService
        .addToFavourites(spell.id, EntityType.Spell)
        .flatMap(() => this.spellsService.getSpell(spell.id))
        .subscribe(updated => this.spellSubject.next(updated));
    }
  }

  onSpellResistableChange(id: number, permits_sr: boolean) {
    this.spellsService
      .updateSpell({
        id,
        permits_sr,
      })
      .subscribe(spell => this.spellSubject.next(spell));
  }

  onSaveChange(id: number, save_type: string) {
    this.spellsService
      .updateSpell({
        id,
        save_type,
      })
      .subscribe(spell => this.spellSubject.next(spell));
  }

  onSpellLevelsChange(id: number, spellLevels: SpellLevel[]) {
    this.spellsService
      .updateSpell({
        id,
        SpellLevels: spellLevels,
      })
      .subscribe(spell => this.spellSubject.next(spell));
  }

  onSpellTypeChange(id: number, spell_type: string) {
    this.spellsService
      .updateSpell({
        id,
        spell_type,
      })
      .subscribe(spell => this.spellSubject.next(spell));
  }

  onSpellRangeChange(id: number, spell_range: string) {
    this.spellsService
      .updateSpell({
        id,
        spell_range,
      })
      .subscribe(spell => this.spellSubject.next(spell));
  }

  onDescriptionChange(id: number, description: string) {
    this.spellsService
      .updateSpell({
        id,
        description,
      })
      .subscribe(spell => this.spellSubject.next(spell));
  }

  onDeleteSpell(id: number) {
    this.spellsService.deleteSpell(id).subscribe(() => {
      this.router.navigateByUrl('spells/find');
    });
  }

  private setCanModify(spell: Spell) {
    this.userService.canEdit(spell).subscribe((canEdit: boolean) => {
      this.canModify = canEdit;
    });
  }
}
