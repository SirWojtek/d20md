import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginationModule, TabsModule } from 'ngx-bootstrap';

import { FindFeatsComponent } from './find-feats.component';
import { SharedModule } from '../../shared/shared.module';
import { FindFeatService } from './find-feat.service';
import { FeatMiniatureComponent } from './feat-miniature-component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    PaginationModule,
    TabsModule,
  ],
  declarations: [
    FindFeatsComponent,
    FeatMiniatureComponent
  ],
  providers: [
    FindFeatService,
  ],
  exports: [
    FindFeatsComponent
  ]
})

export class FindFeatsModule {}
