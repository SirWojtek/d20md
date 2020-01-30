import { NgModule } from '@angular/core';
import { Title, BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { monstersRouting } from './monsters.routing';
import { MonstersPanelsModule } from './panels/monsters-panels.module';
import { ShowMonsterComponent } from './show-monster.component';
import { MonsterFindModule } from './find/monster-find.module';
import { MonstersService } from './monsters.service';
import { SharedModule } from '../shared/shared.module';
import { AddMonsterComponent } from './add/add-monster.component';
import { ShowAllMonsterComponent } from './show-all-monster.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    SharedModule,
    monstersRouting,
    MonstersPanelsModule,
    MonsterFindModule
  ],
  declarations: [
    ShowMonsterComponent,
    ShowAllMonsterComponent,
    AddMonsterComponent
  ],
  providers: [Title, MonstersService]
})
export class MonstersModule {}
