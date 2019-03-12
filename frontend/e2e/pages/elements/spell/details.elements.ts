import {element, by} from 'protractor';

export const detailsElements = {
  saves: {
    saveType: element(by.css('d20md-show-saves img')),
    spellResistable: element(by.css('d20md-show-saves d20md-icon span i')),
  },
  spellLevels: {
    list: element.all(by.css('d20md-show-levels table tbody tr')),
    classNameSelector: 'td:nth-child(1)',
    levelSelector: 'td:nth-child(2)',
  },
  details: {
    type: element(by.css('d20md-spell-type-element span')),
    range: element(by.css('d20md-spell-range-element .bar-border')),
  },
};
