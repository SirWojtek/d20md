import { Component, Input } from '@angular/core';

import { Spell } from '../../shared/model/spell';

@Component({
  selector: 'd20md-spell-miniature',
  templateUrl: './spell-miniature.component.html',
  styleUrls: [ './spell-miniature.component.less' ]
})

export class SpellMiniatureComponent {
  @Input() spell: Spell;
}
