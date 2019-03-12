import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {UserService} from '../shared/user/user.service';

@Component({
  templateUrl: './activate.component.html',
})
export class ActivateComponent implements OnInit, OnDestroy {
  success = false;
  error: string;

  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userService.activate(params['code']).subscribe(
        () => {
          this.success = true;
          this.error = null;
        },
        err => {
          this.error = err.error[0].message;
          this.success = false;
        },
      );
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
