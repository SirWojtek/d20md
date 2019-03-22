import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {
  PaginationModule,
  ButtonsModule,
  AccordionModule,
  TooltipModule,
  ModalModule,
} from 'ngx-bootstrap';
import {TrumbowygModule} from 'ng2-lazy-trumbowyg';
import {NouisliderModule} from 'ng2-nouislider';

import * as pipes from './pipes';
import {MiniatureContainerComponent} from './miniature/miniature-container.component';
import {ModalBaseComponent} from './modal-base/modal-base.component';
import {ModalFormComponent} from './modal-form/modal-form.component';
import {SelectboxComponent} from './selectbox/selectbox.component';
import {AddRemoveEditorComponent} from './add-remove-editor/add-remove-editor.component';
import {EditorTableComponent} from './editor-table/editor-table.component';
import {IconComponent} from './icon/icon.component';
import {DescriptionPanelComponent} from './description-panel/description-panel.component';
import {DescriptionFormComponent} from './description-panel/description-form.component';
import {InputboxComponent} from './inputbox/inputbox.component';
import {RangeSliderComponent} from './range-slider/range-slider.component';
import {SortButtonComponent} from './sort-button/sort-button.component';
import {TooltipButtonComponent} from './tooltip-button/tooltip-button.component';
import {ChipsComponent} from './chips/chips.component';
import {MonstersUsingPanelComponent} from './monsters-using-panel/monsters-using-panel.component';
import {TrumbowygWrapperComponent} from './trumbowyg-wrapper/trumbowyg-wrapper.component';
import {FeatFormComponent} from './feat/feat-form.component';
import {ShowFeatsComponent} from './feat/show-feats.component';
import {FeatEditorComponent} from './feat/feat-editor.component';
import {UnderDevelopmentComponent} from './under-development/under-development.component';
import {MiniatureShowComponent} from './miniature/miniature-show.component';
import {FavouriteMarkComponent} from './favourite-mark/favourites-mark.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PaginationModule,
    TooltipModule,
    ModalModule,
    TrumbowygModule,
    NouisliderModule,
    ButtonsModule,
    AccordionModule,
  ],
  declarations: [
    AddRemoveEditorComponent,
    pipes.MonsterToMiniaturePipe,
    pipes.MonstersToMiniaturesPipe,
    pipes.KeysPipe,
    pipes.StartCasePipe,
    pipes.HitDicePipe,
    pipes.SpellLevelPipe,
    MiniatureShowComponent,
    MiniatureContainerComponent,
    ModalBaseComponent,
    ModalFormComponent,
    SelectboxComponent,
    IconComponent,
    EditorTableComponent,
    DescriptionPanelComponent,
    DescriptionFormComponent,
    InputboxComponent,
    RangeSliderComponent,
    SortButtonComponent,
    TooltipButtonComponent,
    ChipsComponent,
    MonstersUsingPanelComponent,
    TrumbowygWrapperComponent,
    ShowFeatsComponent,
    FeatFormComponent,
    FeatEditorComponent,
    UnderDevelopmentComponent,
    FavouriteMarkComponent,
  ],
  providers: [pipes.StartCasePipe],
  exports: [
    AddRemoveEditorComponent,
    CommonModule,
    FormsModule,
    pipes.MonsterToMiniaturePipe,
    pipes.MonstersToMiniaturesPipe,
    pipes.KeysPipe,
    pipes.StartCasePipe,
    pipes.HitDicePipe,
    pipes.SpellLevelPipe,
    MiniatureContainerComponent,
    ModalBaseComponent,
    ModalFormComponent,
    SelectboxComponent,
    IconComponent,
    DescriptionPanelComponent,
    InputboxComponent,
    RangeSliderComponent,
    EditorTableComponent,
    SortButtonComponent,
    TooltipButtonComponent,
    ChipsComponent,
    MonstersUsingPanelComponent,
    TrumbowygWrapperComponent,
    ShowFeatsComponent,
    FeatFormComponent,
    UnderDevelopmentComponent,
    FavouriteMarkComponent,
  ],
})
export class ElementsModule {}
