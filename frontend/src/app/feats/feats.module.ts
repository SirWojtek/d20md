import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { TabsModule, AccordionModule } from 'ngx-bootstrap';
import { NgxPrintModule } from 'ngx-print';
import { FeatsPanelsModule } from './panels/feats-panels.module';
import { featsRouting } from './feats.routing';
import { ShowFeatComponent } from './show-feat.component';
import { AddFeatComponent } from './add-feat.component';
import { FeatsService } from './feats.service';
import { SharedModule } from '../shared/shared.module';
import { FindFeatsModule } from './find/find-feats.module';
import { ShowAllFeatComponent } from './show-all-feat.component';

@NgModule({
  imports: [
    BrowserModule,
    TabsModule,
    AccordionModule,
    NgxPrintModule,
    SharedModule,
    FeatsPanelsModule,
    FindFeatsModule,
    featsRouting
  ],
  declarations: [ShowFeatComponent, ShowAllFeatComponent, AddFeatComponent],
  providers: [Title, FeatsService]
})
export class FeatsModule {}
