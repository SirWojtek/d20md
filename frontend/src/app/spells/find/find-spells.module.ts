import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { SharedModule } from '../../shared/shared.module';
import { SpellElementsModule } from '../elements/spell-elements.module';
import { FindSpellsComponent } from './find-spells.component';
import { SpellMiniatureComponent } from './spell-miniature.component';
import { FindSpellService } from './find-spell.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    PaginationModule,
    SpellElementsModule,
  ],
  declarations: [
    FindSpellsComponent,
    SpellMiniatureComponent,
  ],
  providers: [
    FindSpellService
  ],
  exports: [
    FindSpellsComponent
  ]
})

export class FindSpellsModule {}
