import {element, by} from 'protractor';

export const movementElements = {
  tab: element(by.cssContainingText('ul.nav li a', 'Movement')),
  values: {
    fly: element(
      by.css(
        'd20md-show-speed div.row:nth-child(1) div:nth-child(1) span.show-text',
      ),
    ),
    swim: element(
      by.css(
        'd20md-show-speed div.row:nth-child(1) div:nth-child(2) span.show-text',
      ),
    ),
    climb: element(
      by.css(
        'd20md-show-speed div.row:nth-child(1) div:nth-child(3) span.show-text',
      ),
    ),
    land: element(
      by.css(
        'd20md-show-speed div.row:nth-child(2) div:nth-child(1) span.show-text',
      ),
    ),
    burrow: element(
      by.css(
        'd20md-show-speed div.row:nth-child(2) div:nth-child(2) span.show-text',
      ),
    ),
  },
};
