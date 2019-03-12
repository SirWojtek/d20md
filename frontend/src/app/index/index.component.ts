import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Feature } from './feature-item.component';
import { UserService } from '../shared/user/user.service';

@Component({
  templateUrl: './index.component.html',
  styleUrls: [ './index.component.less' ]
})

export class IndexComponent {
  public features: Feature[] = [
    new Feature(
      'https://maxcdn.icons8.com/nolan/PNG/96/Data/database-96.png',
      'Basic d20 database',
      'Explore a database containing almost all monsters, spells and feats from basic d20 books.'
    ),
    new Feature(
      'https://maxcdn.icons8.com/nolan/PNG/96/Files/add_file-96.png',
      'Create your piece of d20 world',
      'Build your own monsters, create powerful feats and spells and equip monsters with special abilities.'
    ),
    new Feature(
      'https://maxcdn.icons8.com/nolan/PNG/96/Very_Basic/share-96.png',
      'Explore and share creatures',
      'Take your time and dive deep into part of the d20 world created by other site users. ' +
      'Share your ideas for a game with other players!'
    ),
    new Feature(
      'https://maxcdn.icons8.com/nolan/PNG/96/Very_Basic/synchronize-96.png',
      'Keep the character card online',
      'Use our site to keep a character card handy and always with you. Changing your unique characters was never so simple!'
    ),
    new Feature(
      'https://maxcdn.icons8.com/nolan/PNG/96/Logos/google_mobile-96.png',
      'Mobile friendly',
      'The site is designed also for mobile phones. Browse all mighty creatures from everywhere!'
    ),
    new Feature(
      'https://maxcdn.icons8.com/nolan/PNG/96/Ecommerce/delivery-96.png',
      'Soon: game master table',
      'Bring creatures to your session and change their actual health, spells and other statistics on demand.'
    ),
  ];

  constructor(private userService: UserService) {
  }

  isUnlogged(): Observable<boolean> {
    return this.userService.isLoggedIn().map(isLoggedIn => !isLoggedIn);
  }
}
