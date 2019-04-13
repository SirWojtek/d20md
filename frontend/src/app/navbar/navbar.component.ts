import {Component} from '@angular/core';
import {UserService} from '../shared/user/user.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Router} from '@angular/router';

interface NavbarElement {
  id: string;
  name: string;
  iconClass: string;
  routerLink?: string;
  content?: NavbarElement[];
  clickCallback?: (dropdown) => void;
  canBeShowed?: () => Observable<boolean>;
}

function buildElement(el: NavbarElement): NavbarElement {
  return {
    clickCallback: () => {},
    canBeShowed: () => Observable.of(true),
    ...el,
  };
}

@Component({
  selector: 'd20md-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isLoggedIn = this.userService.isLoggedIn();

  navbarContent: NavbarElement[] = [
    buildElement({
      id: 'dashboard',
      name: 'Dashboard',
      iconClass: 'fa-columns',
      canBeShowed: () => this.isLoggedIn,
      content: [
        buildElement({
          id: 'owner-panel',
          name: 'Owner Panel',
          iconClass: 'fa-book',
          routerLink: '/dashboard/owner-panel/monsters',
        }),
        buildElement({
          id: 'favourites',
          name: 'Favourites',
          iconClass: 'fa-star',
          routerLink: '/dashboard/favourites',
        }),
      ],
    }),
    buildElement({
      id: 'find',
      name: 'Find',
      iconClass: 'fa-search',
      content: [
        buildElement({
          id: 'find-monster',
          name: 'Monster',
          iconClass: 'fa-pastafarianism',
          routerLink: '/monsters/find',
        }),
        buildElement({
          id: 'find-spell',
          name: 'Spell',
          iconClass: 'fa-magic',
          routerLink: '/spells/find',
        }),
        buildElement({
          id: 'find-feat',
          name: 'Feat',
          iconClass: 'fa-bolt',
          routerLink: '/feats/find',
        }),
      ],
    }),
    buildElement({
      id: 'add',
      name: 'Add',
      iconClass: 'fa-plus',
      canBeShowed: () => this.isLoggedIn,
      content: [
        buildElement({
          id: 'add-monster',
          name: 'Monster',
          iconClass: 'fa-pastafarianism',
          routerLink: '/monsters/add',
        }),
        buildElement({
          id: 'add-spell',
          name: 'Spell',
          iconClass: 'fa-magic',
          routerLink: '/spells/add',
        }),
        buildElement({
          id: 'add-feat',
          name: 'Feat',
          iconClass: 'fa-bolt',
          routerLink: '/feats/add',
        }),
      ],
    }),
    buildElement({
      id: 'settings',
      name: 'Settings',
      iconClass: 'fa-cog',
      canBeShowed: () => this.isLoggedIn,
      content: [
        buildElement({
          id: 'change-password',
          name: 'Change Password',
          iconClass: 'fa-key',
          routerLink: '/change-password',
        }),
        buildElement({
          id: 'logout',
          name: 'Logout',
          iconClass: 'fa-sign-out-alt',
          clickCallback: dropdown => this.onLogout(dropdown),
        }),
      ],
    }),
  ];

  constructor(private router: Router, private userService: UserService) {}

  onLogout(dropdown) {
    dropdown.hide();
    this.userService.logout().subscribe(() => this.router.navigate(['/']));
  }
}
