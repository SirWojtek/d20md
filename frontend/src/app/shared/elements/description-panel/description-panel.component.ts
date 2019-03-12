import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'd20md-description-panel',
  template: `
  <div *ngIf="description; else noDescription"
    class="description-container" [innerHTML]="description"
  ></div>
  <ng-template #noDescription>
    <h4>No Description provided</h4>
  </ng-template>
  <div *ngIf="canModify" class="edit-button">
    <button type="button" class="btn btn-default" (click)="descriptionForm.show(description)">Edit</button>
  </div>
  <d20md-description-form #descriptionForm
    (descriptionChange)="onDescriptionChange($event)"
  ></d20md-description-form>
  `,
  styles: [
    `
      .description-container {
        text-align: left;
        background-color: hsl(0, 0%, 22%);
        padding: 15px;
        margin-bottom: 21px;
        border-radius: 3px;
      }
    `,
  ],
})
export class DescriptionPanelComponent {
  @Input()
  description: string;
  @Output()
  descriptionChange = new EventEmitter<string>();
  @Input()
  canModify: boolean;

  onDescriptionChange(newDesc: string) {
    this.description = newDesc;
    this.descriptionChange.emit(this.description);
  }
}
