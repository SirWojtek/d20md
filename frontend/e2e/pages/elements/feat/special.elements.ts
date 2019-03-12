import {element, by} from 'protractor';

export const specialElements = {
  tab: element(by.cssContainingText('tabset ul li span', 'Special')),
  text: element(
    by.css('tab.active d20md-description-panel div.description-container'),
  ),
};
