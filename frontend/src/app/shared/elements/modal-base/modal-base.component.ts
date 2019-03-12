import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ModalDirective } from 'ngx-bootstrap';

export class ModalButton {
  constructor(
    public text: string,
    public btnClass: any,
    public onClick: () => boolean|Observable<boolean> = () => true
  ) {}
}

@Component({
  selector: 'd20md-modal-base',
  template: `
  <div *ngIf="isModalShown" [config]="config" (onHidden)="onHidden()"
    bsModal #autoShownModal="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div [ngClass]="['modal-dialog', modalSizeClass]">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title pull-left">{{ headerText }}</h4>
          <button type="button" class="close pull-right" aria-label="Close" (click)="hideModal()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <ng-content></ng-content>
        </div>
        <div *ngIf="buttons.length" class="modal-footer">
          <button *ngFor="let button of buttons" type="button" class="btn"
            [ngClass]="button.btnClass" (click)="onClick(button)">{{ button.text }}</button>
        </div>
      </div>
    </div>
  </div>
  `
})

export class ModalBaseComponent {
  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;
  @Input() headerText: string;
  @Input() config = { show: true };
  @Input() modalSizeClass = 'modal-md';
  @Input() buttons: ModalButton[] = [];
  @Output() onClose = new EventEmitter();

  public isModalShown = false;

  public showModal(): void {
    this.isModalShown = true;
  }

  public hideModal(): void {
    this.autoShownModal.hide();
  }

  onHidden() {
    this.isModalShown = false;
    this.onClose.emit();
  }

  onClick(button: ModalButton) {
    if (!button) {
      this.hideModal();
      return;
    }

    this.processButtonClick(button);
  }

  private processButtonClick(button: ModalButton) {
    const result = button.onClick();
    const hide = (status) => status && this.hideModal();

    if (result instanceof Observable) {
      result.subscribe(hide);
    } else {
      hide(result);
    }
  }
}
