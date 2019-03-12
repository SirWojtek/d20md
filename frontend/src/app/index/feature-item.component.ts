import { Component, Input } from '@angular/core';

export class Feature {
  constructor(
    public imgSource: string,
    public header: string,
    public text: string
  ) {}
}

@Component({
  selector: 'd20md-feature-item',
  template: `
  <div>
    <img class="img-responsive center-block" src="{{ item?.imgSource }}">
    <h3>{{ item?.header }}</h3>
    <p>{{ item?.text }}</p>
  </div>
   `,
  styles: [
    `h3 {
      white-space: nowrap;
    }`,
    `p {
      font-size: 16px;
      font-weight: lighter;
      text-align: justify;
    }`,
  ]
})

export class FeatureItemComponent {
  @Input() item: Feature;
}
