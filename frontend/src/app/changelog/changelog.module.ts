import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ChangelogComponent } from './changelog.component';

const changelogRoutes: Routes = [
  {
    path: 'changelog',
    component: ChangelogComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(changelogRoutes),
    CommonModule,
  ],
  declarations: [
    ChangelogComponent
  ]
})

export class ChangelogModule {}
