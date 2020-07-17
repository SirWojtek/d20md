import {Component, Output, EventEmitter, ViewChild} from '@angular/core';
import * as _ from 'lodash';
import {AttackGroup} from '../../../shared/model/attack-group';
import {Attack} from '../../../shared/model/attack';
import {
  ModalBaseComponent,
  ModalButton,
} from '../../../shared/elements/modal-base/modal-base.component';
import {EditorTableComponent} from '../../../shared/elements/editor-table/editor-table.component';
import {TableProperties} from '../../../shared/elements/editor-table/editor-table.component';

@Component({
  selector: 'd20md-attack-group-editor',
  templateUrl: './attack-group-editor.component.html',
  styleUrls: ['./attack-group-editor.component.scss'],
})
export class AttackGroupEditorComponent {
  @Output()
  attackGroupsChange = new EventEmitter<AttackGroup[]>();

  @ViewChild(ModalBaseComponent)
  modal: ModalBaseComponent;
  @ViewChild(EditorTableComponent)
  attacksEditor: EditorTableComponent;

  choppedAttackGroups: AttackGroup[][] = [[]];
  attackGroups: AttackGroup[] = [];
  private editedGroup: AttackGroup = null;

  public modalButtons: ModalButton[] = [
    new ModalButton('cancel-attack-group', 'Cancel', 'btn-warning'),
    new ModalButton('save-attack-group', 'Save', 'btn-primary', () =>
      this.onSave(this.attackGroups),
    ),
  ];

  public attackProperties = [
    new TableProperties(
      '',
      'Attack name',
      false,
      (attack: Attack) => attack.name + (attack.is_main ? ' (main)' : ''),
    ),
    new TableProperties('attack_bonus', 'Attack bonus', true),
    new TableProperties('attack_type', 'Attack type', true),
    new TableProperties('range', 'Range', true),
  ];

  show(attackGroups: AttackGroup[]) {
    this.attackGroups = _.cloneDeep(attackGroups);
    this.generateChoppedAttackGroups();
    this.modal.showModal();
  }

  onAttackGroupAdd() {
    this.attackGroups.push(new AttackGroup());
    this.generateChoppedAttackGroups();
  }

  onAttackGroupDelete(toDelete: AttackGroup) {
    const index = this.attackGroups.indexOf(toDelete);
    if (index === -1) {
      return;
    }
    this.attackGroups.splice(index, 1);
    this.generateChoppedAttackGroups();
  }

  onEditorOpen(attackGroup: AttackGroup) {
    this.editedGroup = attackGroup;
    this.attacksEditor.show(attackGroup.Attacks);
  }

  onEditorSave(attacks: Attack[]) {
    if (!this.editedGroup) {
      throw Error('No edited attack group');
    }
    this.editedGroup.Attacks = attacks;
    this.editedGroup = null;
  }

  onSave(attackGroups: AttackGroup[]) {
    this.attackGroups = attackGroups.filter(el => el.Attacks.length !== 0);
    this.attackGroupsChange.emit(this.attackGroups);
    return true;
  }

  private generateChoppedAttackGroups() {
    this.choppedAttackGroups = _.chunk(this.attackGroups, 3);
  }
}
