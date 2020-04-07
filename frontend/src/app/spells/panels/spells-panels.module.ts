import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { SpellElementsModule } from '../elements/spell-elements.module';

import { DetailsPanelComponent } from './details/details-panel.component';
import { DetailsFormComponent } from './details/details-form.component';
import { ShowDetailsComponent } from './details/show-details.component';
import { SavesPanelComponent } from './saves/saves-panel.component';
import { SavesFormComponent } from './saves/saves-form.component';
import { ShowSavesComponent } from './saves/show-saves.component';
import { LevelsPanelComponent } from './levels/levels-panel.component';
import { LevelFormComponent } from './levels/levels-form.component';
import { ShowLevelsComponent } from './levels/show-levels.component';

@NgModule({
  imports: [SharedModule, SpellElementsModule],
  declarations: [
    DetailsPanelComponent,
    DetailsFormComponent,
    ShowDetailsComponent,
    SavesPanelComponent,
    SavesFormComponent,
    ShowSavesComponent,
    LevelsPanelComponent,
    LevelFormComponent,
    ShowLevelsComponent
  ],
  exports: [
    DetailsPanelComponent,
    SavesPanelComponent,
    LevelsPanelComponent,
    ShowSavesComponent,
    ShowLevelsComponent,
    ShowDetailsComponent
  ]
})
export class SpellsPanelsModule {}
