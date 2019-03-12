import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {DashboardComponent} from './dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {FavouritesComponent} from './favourites/favourites.component';
import {AuthGuard} from '../shared/user/auth-guard';
import {DashboardService} from './dashboard.service';
import {ElementsModule} from '../shared/elements/elements.module';
import {ReactiveFormsModule} from '@angular/forms';
import {YourFeatsComponent} from './owner-panel/your-feats/your-feats.component';
import {YourSpellsComponent} from './owner-panel/your-spells/your-spells.component';
import {YourMonstersComponent} from './owner-panel/your-monsters/your-monsters.component';
import {OwnerPanelComponent} from './owner-panel/owner-panel.component';
import {PaginationModule, BsDropdownModule} from 'ngx-bootstrap';
import {ConfirmDeleteModalComponent} from './owner-panel/confirm-delete-modal/confirm-delete-modal.component';
import {EntitiesPanelComponent} from './entities-panel/entities-panel.component';

const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'favourites',
        pathMatch: 'full',
      },
      {
        path: 'favourites',
        component: FavouritesComponent,
      },
      {
        path: 'owner-panel',
        component: OwnerPanelComponent,
        children: [
          {
            path: '',
            redirectTo: 'monsters',
            pathMatch: 'full',
          },
          {
            path: 'monsters',
            component: YourMonstersComponent,
          },
          {
            path: 'spells',
            component: YourSpellsComponent,
          },
          {
            path: 'feats',
            component: YourFeatsComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forChild(dashboardRoutes),
    ElementsModule,
    ReactiveFormsModule,
    PaginationModule,
    BsDropdownModule,
  ],
  declarations: [
    DashboardComponent,
    FavouritesComponent,
    YourMonstersComponent,
    YourSpellsComponent,
    YourFeatsComponent,
    OwnerPanelComponent,
    ConfirmDeleteModalComponent,
    EntitiesPanelComponent,
  ],
  providers: [DashboardService],
  exports: [DashboardComponent],
})
export class DashboardModule {}
