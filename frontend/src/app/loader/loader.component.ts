import { Component } from '@angular/core';

import { ReqeustCounterService } from '../http-interceptor/request-counter.service';

@Component({
  selector: 'd20md-loader',
  template: `
    <div *ngIf="isShowed" id="overlay">
      <div class="loader-container">
        <d20md-loader-icon></d20md-loader-icon>
        <div class="textbox">Summoning</div>
      </div>
    </div>
  `,
  styleUrls: [ './loader.component.scss' ]
})

export class LoaderComponent {
  isShowed = false;

  constructor(requestCounterService: ReqeustCounterService) {
    requestCounterService.counterObservable
      .debounceTime(800)
      .subscribe(count => this.isShowed = !!count);

  }
}
