import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CanActivate} from '@angular/router';
import {UserService} from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate() {
    return this.userService.isLoggedIn().map(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigate(['/']);
      }
      return isLoggedIn;
    });
  }
}
