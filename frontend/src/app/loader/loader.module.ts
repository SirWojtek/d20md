import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader.component';
import { LoaderIconComponent } from './loader-icon.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    LoaderComponent,
    LoaderIconComponent,
  ],
  exports: [
    LoaderComponent
  ]
})

export class LoaderModule {}
