import {Component} from '@angular/core';
import {UserService} from '../shared/user/user.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public email: string;
  public password: string;

  public errorText: string = null;

  constructor(private router: Router, private userService: UserService) {}

  onLogin() {
    this.userService
      .login(this.email, this.password)
      .map(() => true)
      .subscribe(
        () => {
          this.errorText = null;
          this.router.navigate(['/', 'dashboard', 'owner-panel', 'monsters']);
        },
        err => (this.errorText = err.error),
      );
  }
}
