import {Component, Output, EventEmitter, ViewChild} from '@angular/core';
import {
  ModalBaseComponent,
  ModalButton,
} from '../modal-base/modal-base.component';
import {TrumbowygWrapperComponent} from '../trumbowyg-wrapper/trumbowyg-wrapper.component';

@Component({
  selector: 'd20md-description-form',
  template: `
  <d20md-modal-base
    [buttons]="modalButtons"
    [headerText]="'Edit description'"
  >
    <d20md-trumbowyg-wrapper (onChange)="editorOutput = $event">
    </d20md-trumbowyg-wrapper>
  </d20md-modal-base>
  `,
})
export class DescriptionFormComponent {
  @Output()
  descriptionChange = new EventEmitter<string>();

  @ViewChild(ModalBaseComponent)
  modal: ModalBaseComponent;
  @ViewChild(TrumbowygWrapperComponent)
  trumbowyg: TrumbowygWrapperComponent;

  description: string;
  editorOutput: string;

  public modalButtons: ModalButton[] = [
    new ModalButton('cancel-description', 'Cancel', 'btn-warning'),
    new ModalButton('save-description', 'Save', 'btn-primary', () =>
      this.onSave(),
    ),
  ];

  public show(description: string) {
    // NOTE: hack for showing new content
    this.trumbowyg.init(description);
    this.modal.showModal();
  }

  onSave() {
    this.descriptionChange.emit(this.editorOutput);
    return true;
  }
}
