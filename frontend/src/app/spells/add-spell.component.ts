import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {SpellsService} from './spells.service';

@Component({
  templateUrl: './add-spell.component.html',
  styles: ['.introduce-container { text-align: center; }'],
})
export class AddSpellComponent implements OnInit {
  name: string;
  error: string;

  constructor(
    private router: Router,
    private titleService: Title,
    private spellsService: SpellsService,
  ) {}

  ngOnInit() {
    this.titleService.setTitle('d20MD - Add Spell');
  }

  onSubmit(name: string) {
    this.spellsService.addSpell(name).subscribe(
      id => this.router.navigate(['spells/show/', id]),
      err => {
        this.error = err[0].message.includes('unique')
          ? 'Spell with that name already exists'
          : err[0].message;
      },
    );
  }
}
