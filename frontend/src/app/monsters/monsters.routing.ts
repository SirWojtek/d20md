import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '../shared/user/auth-guard';
import {ShowMonsterComponent} from './show-monster.component';
import {FindMonstersComponent} from './find/find-monsters.component';
import {monstersPanelsRoutes} from './panels/monsters-panels.module';
import {AddMonsterComponent} from './add/add-monster.component';

const monstersRoutes: Routes = [
  {
    path: 'monsters',
    redirectTo: 'monsters/find',
    pathMatch: 'full',
  },
  {
    path: 'monsters/show/:id',
    component: ShowMonsterComponent,
    children: monstersPanelsRoutes,
  },
  {
    path: 'monsters/add',
    component: AddMonsterComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'monsters/find',
    component: FindMonstersComponent,
  },
];

export const monstersRouting = RouterModule.forChild(monstersRoutes);
