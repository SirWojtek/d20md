import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { IndexComponent } from './index.component';
import { FeatureItemComponent } from './feature-item.component';

@NgModule({
  imports : [
    BrowserModule,
    RouterModule
  ],
  declarations : [
    FeatureItemComponent,
    IndexComponent,
  ],
  exports : [
    IndexComponent,
  ]
})

export class IndexModule { }
