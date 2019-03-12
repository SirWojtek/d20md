import {NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';

import {SpellsPanelsModule} from './panels/spells-panels.module';
import {spellsRouting} from './spells.routing';
import {ShowSpellComponent} from './show-spell.component';
import {AddSpellComponent} from './add-spell.component';
import {SpellsService} from './spells.service';
import {SharedModule} from '../shared/shared.module';
import {FindSpellsModule} from './find/find-spells.module';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    spellsRouting,
    SpellsPanelsModule,
    FindSpellsModule,
  ],
  declarations: [ShowSpellComponent, AddSpellComponent],
  providers: [Title, SpellsService],
})
export class SpellsModule {}
