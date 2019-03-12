import {element, by} from 'protractor';

export const featElements = {
  tab: element(by.cssContainingText('ul.nav li a', 'Feats')),
  featList: element.all(by.css('d20md-feat-panel accordion accordion-group')),
};
