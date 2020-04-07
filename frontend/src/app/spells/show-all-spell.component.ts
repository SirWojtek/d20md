import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Spell } from '../shared/model/spell';
import { SpellsService } from './spells.service';

@Component({
  templateUrl: './show-all-spell.component.html',
  styleUrls: ['./show-all-spell.component.scss']
})
export class ShowAllSpellComponent {
  spellObs: Observable<Spell> = this.route.params.switchMap(params =>
    this.spellsService.getSpell(+params['id'])
  );

  constructor(
    private route: ActivatedRoute,
    private spellsService: SpellsService
  ) {}
}
