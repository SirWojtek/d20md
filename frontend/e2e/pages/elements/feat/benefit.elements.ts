import {element, by} from 'protractor';

export const benefitElements = {
  text: element(
    by.css('tab.active d20md-description-panel div.description-container'),
  ),
};
