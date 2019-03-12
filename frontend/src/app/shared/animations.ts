import {
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';

export const slideInOutLeft = trigger('slideInOutLeft', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateX(-100%)'}),
    animate('300ms ease-in', style({opacity: 1, transform: 'translateX(0%)'})),
  ]),
  transition(':leave', [
    animate(
      '300ms ease-in',
      style({opacity: 0, transform: 'translateX(-100%)'}),
    ),
  ]),
]);

export const slideInOutRight = trigger('slideInOutRight', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateX(100%)'}),
    animate('300ms ease-in', style({opacity: 1, transform: 'translateX(0%)'})),
  ]),
  transition(':leave', [
    animate(
      '300ms ease-in',
      style({opacity: 0, transform: 'translateX(100%)'}),
    ),
  ]),
]);
