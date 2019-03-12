import {element, by} from 'protractor';

export const normalElements = {
  tab: element(by.cssContainingText('tabset ul li span', 'Normal')),
  text: element(
    by.css('tab.active d20md-description-panel div.description-container'),
  ),
};
