import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'd20md-favourites-mark',
  templateUrl: './favourites-mark.component.html',
})
export class FavouriteMarkComponent {
  @Input()
  isFavourite: boolean;

  @Input()
  favouritesCount: number;

  @Output()
  onClick = new EventEmitter<void>();
}
