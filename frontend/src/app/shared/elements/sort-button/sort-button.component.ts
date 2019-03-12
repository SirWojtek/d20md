import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'd20md-sort-button',
  template: `
  <button type="button" title="Sort" class="btn btn-sm btn-primary" (click)="onOrderChange()">
    <d20md-icon [iconName]="getIconName()"></d20md-icon>
  </button>
  `
})

export class SortButtonComponent {
  @Input() sortType = 'alphanumeric';
  @Output() sortOrder = new EventEmitter<string>();

  private currentOrder: string = null;

  onOrderChange() {
    switch (this.currentOrder) {
      case null:
        this.currentOrder = 'asc';
        break;
      case 'asc':
        this.currentOrder = 'desc';
        break;
      case 'desc':
        this.currentOrder = null;
        break;
    }
    this.sortOrder.emit(this.currentOrder);
  }

  getIconName(): string {
    if (this.currentOrder === null) {
      return 'fa-sort';
    }
    if (this.sortType === 'alphanumeric') {
      return this.currentOrder === 'asc' ? 'fa-sort-alpha-asc' : 'fa-sort-alpha-desc';
    }
    if (this.sortType === 'numeric') {
      return this.currentOrder === 'desc' ? 'fa-sort-numeric-asc' : 'fa-sort-numeric-desc';
    }
  }
}
