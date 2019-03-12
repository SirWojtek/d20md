import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {BsDropdownModule, PopoverModule, TypeaheadModule} from 'ngx-bootstrap';

import {NavbarComponent} from './navbar.component';
import {SharedModule} from '../shared/shared.module';
import {Angulartics2Module} from 'angulartics2';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {QuickSearchService} from './search-bar/quick-search.service';

@NgModule({
  imports: [
    SharedModule,
    BsDropdownModule,
    ReactiveFormsModule,
    RouterModule,
    Angulartics2Module,
    PopoverModule,
    TypeaheadModule,
  ],
  declarations: [NavbarComponent, SearchBarComponent],
  providers: [QuickSearchService],
  exports: [NavbarComponent],
})
export class NavbarModule {}
