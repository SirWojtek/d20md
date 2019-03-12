import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FeatTypePanelComponent} from './feat-type/feat-type-panel.component';
import {FeatTypeFormComponent} from './feat-type/feat-type-form.component';
import {ShowFeatTypeComponent} from './feat-type/show-feat-type.component';
import {PrerequisitePanelComponent} from './prerequisite-panel/prerequisite-panel.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    FeatTypePanelComponent,
    FeatTypeFormComponent,
    ShowFeatTypeComponent,
    PrerequisitePanelComponent,
  ],
  exports: [FeatTypePanelComponent, PrerequisitePanelComponent],
})
export class FeatsPanelsModule {}
