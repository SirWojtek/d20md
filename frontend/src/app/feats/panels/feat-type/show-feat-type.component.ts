import { Component, Input } from '@angular/core';

@Component({
  selector: 'd20md-show-feat-type',
  template: `
  <img src="assets/img/{{ featType }}.svg" title="{{ featType }}" height="96">
  `
})

export class ShowFeatTypeComponent {
  @Input() featType: string;
}
