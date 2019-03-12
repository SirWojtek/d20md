import {element, by} from 'protractor';

export const specialElements = {
  tab: element(by.cssContainingText('ul.nav li a', 'Special Abilities')),
  specialList: element.all(
    by.css('d20md-special-panel accordion accordion-group'),
  ),
};
