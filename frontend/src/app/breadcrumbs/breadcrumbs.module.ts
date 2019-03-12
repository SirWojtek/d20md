import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BreadcrumbsComponent} from './breadcrumbs.component';
import {BrowserModule} from '@angular/platform-browser';
import {ElementsModule} from '../shared/elements/elements.module';

@NgModule({
  imports: [RouterModule, BrowserModule, ElementsModule],
  declarations: [BreadcrumbsComponent],
  exports: [BreadcrumbsComponent],
})
export class BreadcrumbsModule {}
