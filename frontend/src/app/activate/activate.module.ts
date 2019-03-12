import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {activateRouting} from './activate.routing';
import {ActivateComponent} from './activate.component';

@NgModule({
  imports: [activateRouting, BrowserModule],
  declarations: [ActivateComponent],
})
export class ActivateModule {}
