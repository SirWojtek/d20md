import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FeatsService } from './feats.service';

@Component({
  selector : 'd20md-add-feat',
  templateUrl: './add-feat.component.html',
  styles: [ './add-feat.component.scss' ]
})

export class AddFeatComponent implements OnInit {
  name: string;
  error: string;

  constructor(
    private router: Router,
    private titleService: Title,
    private featsService: FeatsService) {
  }

  ngOnInit() {
    this.titleService.setTitle( 'd20MD - Add feat');
  }

  onSubmit(name: string) {
    this.featsService.addFeat(name)
      .subscribe(
        id => this.router.navigate(['feats/show/', id]),
        err => {
          this.error = err[0].message.includes('unique') ?
            'Feat with that name already exists' :
            err[0].message;
        });
  }
}
