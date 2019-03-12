import { Component, Input } from '@angular/core';

import { Feat } from '../../shared/model/feat';

@Component({
  selector: 'd20md-feat-miniature',
  templateUrl: './feat-miniature-component.html',
  styleUrls: [ './feat-miniature-component.scss' ]
})

export class FeatMiniatureComponent {
  @Input() feat: Feat;
  @Input() searchPhrase: string;

  highlight(htmlText: string) {
    return this.searchPhrase ? htmlText.replace(new RegExp(this.searchPhrase, 'ig'),
      '<span class="highlight">$&</span>') : htmlText;
  }
}
