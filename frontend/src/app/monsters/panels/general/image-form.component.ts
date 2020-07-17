import {Component, EventEmitter, Output, ViewChild} from '@angular/core';

import {Image} from '../../../shared/model/image';
import {
  ModalBaseComponent,
  ModalButton,
} from '../../../shared/elements/modal-base/modal-base.component';
import {MonstersService} from '../../monsters.service';

@Component({
  selector: 'd20md-image-form',
  templateUrl: './image-form.component.html',
})
export class ImageFormComponent {
  @Output()
  imageChange = new EventEmitter<Image>();

  @ViewChild(ModalBaseComponent)
  modal: ModalBaseComponent;

  monsterId: number;
  currentImage: File;

  modalButtons: ModalButton[] = [
    new ModalButton('cancel-image', 'Cancel', 'btn-warning'),
    new ModalButton('save-image', 'Save', 'btn-primary', () => this.onSave()),
  ];

  constructor(private monstersService: MonstersService) {}

  onImageUpload(files: FileList) {
    if (!files) {
      return;
    }
    this.currentImage = files[0];
  }

  show(id: number) {
    this.monsterId = id;
    this.modal.showModal();
  }

  onSave() {
    return this.monstersService
      .addImage(this.monsterId, this.currentImage)
      .do(image => {
        this.imageChange.emit(image);
      })
      .map(image => true);
  }
}
