import {Component, Input, OnChanges} from '@angular/core';
import * as _ from 'lodash';
import {Miniature} from './miniature';

@Component({
  selector: 'd20md-miniature-container',
  template: `
  <div class="row">
    <div [ngClass]="miniatureClass" *ngFor="let miniature of chunkedMiniatures[currentPage - 1]">
       <d20md-miniature-show [miniature]="miniature"></d20md-miniature-show>
    </div>
  </div>
  <div class="row" *ngIf="showPagination()">
     <pagination
        [totalItems]="chunkedMiniatures.length"
        [(ngModel)]="currentPage"
     ></pagination>
  </div>
  `,
})
export class MiniatureContainerComponent implements OnChanges {
  @Input()
  miniatures: Miniature[] = [];
  @Input()
  miniatureClass = 'col-sm-3';
  @Input()
  itemsPerPage = 16;

  public currentPage = 1;
  public chunkedMiniatures: Miniature[][] = [];

  ngOnChanges(changes: any) {
    if (!changes['miniatures'] || !changes['miniatures'].currentValue) {
      return;
    }

    this.miniatures = changes['miniatures'].currentValue;
    this.createChunkedMiniatures();
  }

  showPagination(): boolean {
    return this.miniatures.length > this.itemsPerPage;
  }

  private createChunkedMiniatures() {
    this.chunkedMiniatures = _.chunk(this.miniatures, this.itemsPerPage);
  }
}
