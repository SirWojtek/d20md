import {Routes, RouterModule} from '@angular/router';
import {ActivateComponent} from './activate.component';

const activateRoutes: Routes = [
  {
    path: 'activate/:code',
    component: ActivateComponent,
  },
];

export const activateRouting = RouterModule.forChild(activateRoutes);
