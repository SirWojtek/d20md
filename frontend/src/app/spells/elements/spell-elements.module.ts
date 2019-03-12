import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { SpellLevelElementComponent } from './spell-level-element.component';
import { SpellTypeElementComponent } from './spell-type-element.component';
import { SpellRangeElementComponent } from './spell-range-element.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    SpellLevelElementComponent,
    SpellTypeElementComponent,
    SpellRangeElementComponent
  ],
  exports: [
    SpellLevelElementComponent,
    SpellTypeElementComponent,
    SpellRangeElementComponent
  ]
})

export class SpellElementsModule {}
