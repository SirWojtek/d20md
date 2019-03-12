import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {PolicyComponent} from './policy/policy.component';

const appRoutes: Routes = [
  {
    path: '#',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'policy',
    component: PolicyComponent,
  },
];

export const appRoutingProviders: any[] = [];
export const routing = RouterModule.forRoot(appRoutes);
