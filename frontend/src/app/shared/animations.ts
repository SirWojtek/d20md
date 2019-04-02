import {trigger, transition, style, animate} from '@angular/animations';

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

export const slideInOutTop = trigger('slideInOutTop', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateY(100%)'}),
    animate('300ms ease-in', style({opacity: 1, transform: 'translateY(0%)'})),
  ]),
  transition(':leave', [
    animate(
      '300ms ease-in',
      style({opacity: 0, transform: 'translateY(100%)'}),
    ),
  ]),
]);

export const slideInOutBottom = trigger('slideInOutBottom', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateY(-100%)'}),
    animate('300ms ease-in', style({opacity: 1, transform: 'translateY(0%)'})),
  ]),
  transition(':leave', [
    animate(
      '300ms ease-in',
      style({opacity: 0, transform: 'translateY(-100%)'}),
    ),
  ]),
]);

// NOTE: enable when need to use
// export const fadeIn = trigger('fadeIn', [
// transition(':enter', [
// style({opacity: 0}),
// animate('300ms ease-in', style({opacity: 1})),
// ]),
// transition(':leave', [animate('300ms ease-in', style({opacity: 0}))]),
// ]);
