import { Component, Input } from '@angular/core';

import { Monster } from '../../shared/model/monster';

@Component({
  selector: 'd20md-find-miniature',
  templateUrl: './find-miniature.component.html',
  styleUrls: [ './find-miniature.component.scss' ]
})

export class FindMiniatureComponent {
  @Input() monster: Monster;
}
