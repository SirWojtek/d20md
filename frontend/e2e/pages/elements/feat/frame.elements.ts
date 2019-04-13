import {element, by} from 'protractor';

export const frameElements = {
  base: element(by.css('div#show-feat-frame')),
  name: element(by.css('div.panel-heading h2')),
};
