import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AccordionModule, ButtonsModule, TooltipModule } from 'ngx-bootstrap';
import { AlertModule } from 'ngx-bootstrap';
import { SortableModule, PaginationModule } from 'ngx-bootstrap';
import { ArmorPanelComponent } from './armor/armor-panel.component';
import { ArmorFormComponent } from './armor/armor-form.component';
import { ShowArmorComponent } from './armor/show-armor.component';
import { AttacksPanelComponent } from './attacks/attacks-panel.component';
import { ShowAttacksComponent } from './attacks/show-attacks.component';
import { AttackFormComponent } from './attacks/attack-form.component';
import { AttackGroupEditorComponent } from './attacks/attack-group-editor.component';
import { AddAttackGroupComponent } from './attacks/add-attack-group.component';
import { DamageTableComponent } from './attacks/damage-table.component';
import { AttributePanelComponent } from './attribute/attribute-panel.component';
import { AttributeFormComponent } from './attribute/attribute-form.component';
import { ShowAttributeComponent } from './attribute/show-attribute.component';
import { HitDicesPanelComponent } from './hit/hit-dices-panel.component';
import { HitDiceFormComponent } from './hit/hit-dice-form.component';
import { HpFormComponent } from './hit/hp-form.component';
import { ShowHitDicesComponent } from './hit/show-hit-dices.component';
import { ImageFormComponent } from './general/image-form.component';
import { SavePanelComponent } from './save/save-panel.component';
import { SaveFormComponent } from './save/save-form.component';
import { ShowSaveComponent } from './save/show-save.component';
import { ShowSkillComponent } from './skill/show-skill.component';
import { SkillPanelComponent } from './skill/skill-panel.component';
import { SkillFormComponent } from './skill/skill-form.component';
import { SpellPanelComponent } from './spell/spell-panel.component';
import { SpellEditorComponent } from './spell/spell-editor.component';
import { SpellFormComponent } from './spell/spell-form.component';
import { SpecialPanelComponent } from './special/special-panel.component';
import { SpecialFormComponent } from './special/special-form.component';
import { SpeedPanelComponent } from './speed/speed-panel.component';
import { SpeedFormComponent } from './speed/speed-form.component';
import { ShowSpeedComponent } from './speed/show-speed.component';

import { SharedModule } from '../../shared/shared.module';
import { ShowSpellsComponent } from './spell/show-spells.component';
import { FeatPanelComponent } from './feat/feat-panel.component';
import { MonsterDescriptionPanelComponent } from './description/monster-description-panel.component';
import { GeneralFormComponent } from './general/general-form.component';
import { GeneralPanelComponent } from './general/general-panel.component';
import { GenerateHitDicesFormComponent } from './hit/generate-hit-dices-form.component';
import { ShowSpecialComponent } from './special/show-special.component';

export const monstersPanelsRoutes: Routes = [
  {
    path: '',
    redirectTo: 'attributes',
    pathMatch: 'full'
  },
  {
    path: 'attributes',
    component: AttributePanelComponent
  },
  {
    path: 'defences',
    component: ArmorPanelComponent
  },
  {
    path: 'attacks',
    component: AttacksPanelComponent
  },
  {
    path: 'movement',
    component: SpeedPanelComponent
  },
  {
    path: 'skills',
    component: SkillPanelComponent
  },
  {
    path: 'spells',
    component: SpellPanelComponent
  },
  {
    path: 'feats',
    component: FeatPanelComponent
  },
  {
    path: 'special',
    component: SpecialPanelComponent
  },
  {
    path: 'description',
    component: MonsterDescriptionPanelComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    AccordionModule,
    PaginationModule,
    AlertModule,
    SortableModule,
    ButtonsModule,
    TooltipModule
  ],
  declarations: [
    ArmorFormComponent,
    ArmorPanelComponent,
    ShowArmorComponent,
    AttacksPanelComponent,
    ShowAttacksComponent,
    AttackFormComponent,
    AttackGroupEditorComponent,
    AddAttackGroupComponent,
    DamageTableComponent,
    AttributePanelComponent,
    AttributeFormComponent,
    ShowAttributeComponent,
    HitDicesPanelComponent,
    HitDiceFormComponent,
    GenerateHitDicesFormComponent,
    HpFormComponent,
    ShowHitDicesComponent,
    ImageFormComponent,
    SavePanelComponent,
    SaveFormComponent,
    ShowSaveComponent,
    ShowSkillComponent,
    SkillPanelComponent,
    SkillFormComponent,
    SpellFormComponent,
    SpellEditorComponent,
    ShowSpellsComponent,
    SpellPanelComponent,
    SpecialFormComponent,
    SpecialPanelComponent,
    SpeedFormComponent,
    ShowSpeedComponent,
    SpeedPanelComponent,
    GeneralFormComponent,
    GeneralPanelComponent,
    FeatPanelComponent,
    MonsterDescriptionPanelComponent,
    ShowSpecialComponent
  ],
  exports: [
    SavePanelComponent,
    HitDicesPanelComponent,
    GeneralPanelComponent,
    ShowAttributeComponent,
    ShowArmorComponent,
    ShowAttacksComponent,
    ShowSpeedComponent,
    ShowSkillComponent,
    ShowSpellsComponent,
    ShowSpecialComponent
  ]
})
export class MonstersPanelsModule {}
