import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { TabsModule } from 'ngx-bootstrap';
import { FeatsPanelsModule } from './panels/feats-panels.module';
import { featsRouting } from './feats.routing';
import { ShowFeatComponent } from './show-feat.component';
import { AddFeatComponent } from './add-feat.component';
import { FeatsService } from './feats.service';
import { SharedModule } from '../shared/shared.module';
import { FindFeatsModule } from './find/find-feats.module';

@NgModule({
  imports : [
    BrowserModule,
    TabsModule,
    SharedModule,
    FeatsPanelsModule,
    FindFeatsModule,
    featsRouting,
  ],
  declarations : [
    ShowFeatComponent,
    AddFeatComponent,
  ],
  providers : [
    Title,
    FeatsService
  ]
})

export class FeatsModule { }
