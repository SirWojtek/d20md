import {Component, Input, Output, EventEmitter} from '@angular/core';
import {slideInOutTop, slideInOutBottom} from '../../animations';

@Component({
  selector: 'd20md-favourites-mark',
  templateUrl: './favourites-mark.component.html',
  styleUrls: ['./favourites-mark.component.scss'],
  animations: [slideInOutTop, slideInOutBottom],
})
export class FavouriteMarkComponent {
  @Input()
  isFavourite: boolean;

  @Input()
  favouritesCount: number;

  @Output()
  onClick = new EventEmitter<void>();
}
