import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/user/auth-guard';
import { ShowSpellComponent } from './show-spell.component';
import { AddSpellComponent } from './add-spell.component';
import { FindSpellsComponent } from './find/find-spells.component';
import { ShowAllSpellComponent } from './show-all-spell.component';

const spellsRoutes: Routes = [
  {
    path: 'spells',
    redirectTo: 'spells/find',
    pathMatch: 'full'
  },
  {
    path: 'spells/show/:id',
    component: ShowSpellComponent
  },
  {
    path: 'spells/show-all/:id',
    component: ShowAllSpellComponent
  },
  {
    path: 'spells/add',
    component: AddSpellComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'spells/find',
    component: FindSpellsComponent
  }
];

export const spellsRouting: ModuleWithProviders = RouterModule.forChild(
  spellsRoutes
);
