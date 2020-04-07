import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FeatsService } from './feats.service';
import { Feat } from '../shared/model/feat';

@Component({
  templateUrl: './show-all-feat.component.html',
  styleUrls: ['./show-all-feat.component.scss']
})
export class ShowAllFeatComponent {
  featObs: Observable<Feat> = this.route.params.switchMap(params =>
    this.featsService.getFeat(+params['id'])
  );

  constructor(
    private route: ActivatedRoute,
    private featsService: FeatsService
  ) {}
}
