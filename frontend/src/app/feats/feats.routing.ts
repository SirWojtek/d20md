import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/user/auth-guard';
import { ShowFeatComponent } from './show-feat.component';
import { AddFeatComponent } from './add-feat.component';
import { FindFeatsComponent } from './find/find-feats.component';

const featsRoutes: Routes = [
  {
    path: 'feats',
    redirectTo: 'feats/find',
    pathMatch: 'full',
  },
  {
    path: 'feats/show/:id',
    component: ShowFeatComponent,
  },
  {
    path: 'feats/add',
    component: AddFeatComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path : 'feats/find',
    component : FindFeatsComponent,
  },
];

export const featsRouting: ModuleWithProviders = RouterModule.forChild(featsRoutes);
