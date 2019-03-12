import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Miniature} from './miniature';

@Component({
  selector: 'd20md-miniature-show',
  template: `
   <div class="panel panel-default hover-highlight" (click)="onClick()">
      <div class="panel-heading">{{ miniature.header }}</div>
      <div *ngIf="miniature.imageUrl" class="panel-body">
         <img class="img-responsive" src="{{ miniature.imageUrl }}" alt="{{ miniature.header }} image">
      </div>
      <div *ngIf="miniature.data" class="panel-footer">
         {{ miniature.data }}
      </div>
   </div>
   `,
  styles: [
    ':host .hover-highlight:hover { border-color: silver; border-size: 40px; }',
  ],
})
export class MiniatureShowComponent {
  @Input()
  miniature: Miniature;

  constructor(private router: Router) {}

  onClick() {
    this.router.navigateByUrl(this.miniature.redirectUrl);
  }
}
