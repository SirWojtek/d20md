import {by} from 'protractor';

export const accordionSelectors = {
  header: by.css('div.panel div.panel-heading div.accordion-toggle div'),
  text: by.css('div.panel div.panel-body div'),
};
