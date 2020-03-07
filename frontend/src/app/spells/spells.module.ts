import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgxPrintModule } from 'ngx-print';

import { SpellsPanelsModule } from './panels/spells-panels.module';
import { spellsRouting } from './spells.routing';
import { ShowSpellComponent } from './show-spell.component';
import { AddSpellComponent } from './add-spell.component';
import { SpellsService } from './spells.service';
import { SharedModule } from '../shared/shared.module';
import { FindSpellsModule } from './find/find-spells.module';
import { ShowAllSpellComponent } from './show-all-spell.component';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    NgxPrintModule,
    spellsRouting,
    SpellsPanelsModule,
    FindSpellsModule
  ],
  declarations: [ShowSpellComponent, ShowAllSpellComponent, AddSpellComponent],
  providers: [Title, SpellsService]
})
export class SpellsModule {}
