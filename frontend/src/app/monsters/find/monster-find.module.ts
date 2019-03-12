import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ElementsModule } from '../../shared/elements/elements.module';
import { FindMonsterService } from './find-monster.service';
import { FindTagComponent } from './find-tag.component';
import { FindFormComponent } from './find-form.component';
import { FindMonstersComponent } from './find-monsters.component';
import { FindMiniatureComponent } from './find-miniature.component';
import { ArmorElementComponent } from './elements/armor-element.component';
import { AttackElementComponent } from './elements/attack-element.component';
import { CrElementComponent } from './elements/cr-element.component';
import { EnvironmentElementComponent } from './elements/environment-element.component';
import { HdElementComponent } from './elements/hd-element.component';
import { SizeElementComponent } from './elements/size-element.component';
import { TypeElementComponent } from './elements/type-element.component';
import { PaginationModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PaginationModule,
    ElementsModule,
  ],
  declarations: [
    FindTagComponent,
    FindFormComponent,
    FindMonstersComponent,
    FindMiniatureComponent,
    ArmorElementComponent,
    AttackElementComponent,
    CrElementComponent,
    EnvironmentElementComponent,
    HdElementComponent,
    SizeElementComponent,
    TypeElementComponent,
  ],
  providers: [
    FindMonsterService,
  ],
  exports: [
    FindMonstersComponent,
    ArmorElementComponent,
    AttackElementComponent,
    CrElementComponent,
    HdElementComponent,
    SizeElementComponent,
    TypeElementComponent,
    EnvironmentElementComponent
  ]
})

export class MonsterFindModule {}
