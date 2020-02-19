import { Input, Component } from '@angular/core';
import { SpecialAbility } from '../../../shared/model/special-ability';
import { Utils } from '../../../shared/utils';

@Component({
  selector: 'd20md-show-special',
  template: `
    <div class="special-container">
      <accordion>
        <accordion-group
          *ngFor="let special of specialPage"
          heading="{{ special.name }}"
        >
          <img
            [src]="'assets/img/' + special.type + '.svg'"
            height="64"
            title="{{ utils.toUpperCase(special.type) }}"
          />
          <div [innerHtml]="special.description" class="description"></div>
          <hr *ngIf="canModifyObs | async" />
          <button
            *ngIf="canModifyObs | async"
            class="btn btn-default"
            (click)="onSpecialEdit(special)"
          >
            Edit
          </button>
          <button
            *ngIf="canModifyObs | async"
            class="btn btn-danger"
            (click)="onSpecialDelete(special)"
          >
            Delete
          </button>
        </accordion-group>
      </accordion>
      <pagination
        *ngIf="specials.length > page.size"
        [totalItems]="specials.length"
        [(ngModel)]="page.current"
        (ngModelChange)="onPageChange()"
        [itemsPerPage]="page.size"
        [maxSize]="5"
        class="pagination-sm"
        [boundaryLinks]="true"
      ></pagination>
    </div>
  `
})
export class ShowSpecialComponent {
  @Input()
  set specials(newVal: SpecialAbility[]) {
    if (newVal === this._specials) {
      return;
    }
    this._specials = newVal;

    this.page.total = this.specials.length;
    this.onPageChange();
  }
  get specials(): SpecialAbility[] {
    return this._specials;
  }

  _specials: SpecialAbility[] = [];
  page = {
    current: 1,
    total: 0,
    size: 5
  };
  specialPage: SpecialAbility[] = [];
  utils = Utils;

  onPageChange() {
    const offset = (this.page.current - 1) * this.page.size;
    const limit = this.page.size;

    this.specialPage = this.specials.slice(offset, offset + limit);
  }
}
