import {Component} from '@angular/core';
import {UserService} from '../shared/user/user.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  emailControl = new FormControl('', [Validators.required, Validators.email]);

  errorText = '';
  text = '';

  constructor(private userService: UserService) {}

  onReset() {
    this.errorText = '';
    this.text = '';

    this.userService
      .resetPassword(this.emailControl.value)
      .subscribe(
        () => (this.text = 'Reset password link sent.'),
        err => (this.errorText = err),
      );
  }
}
