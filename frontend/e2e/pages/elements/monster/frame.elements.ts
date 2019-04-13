import {element, by} from 'protractor';

export const frameElements = {
  base: element(by.css('.show-monster-wrapper')),
  name: element(by.css('.show-monster-wrapper h2.name-panel-item')),
  deleteButton: element(by.css('button#delete-monster')),
  saves: {
    will: {
      total: element(
        by.css('d20md-show-save table tr:nth-child(1) td:nth-child(2)'),
      ),
      base: element(
        by.css('d20md-show-save table tr:nth-child(1) td:nth-child(3)'),
      ),
    },
    reflex: {
      total: element(
        by.css('d20md-show-save table tr:nth-child(2) td:nth-child(2)'),
      ),
      base: element(
        by.css('d20md-show-save table tr:nth-child(2) td:nth-child(3)'),
      ),
    },
    fortitude: {
      total: element(
        by.css('d20md-show-save table tr:nth-child(3) td:nth-child(2)'),
      ),
      base: element(
        by.css('d20md-show-save table tr:nth-child(3) td:nth-child(3)'),
      ),
    },
  },
  hitDices: {
    dices: element.all(
      by.css('d20md-show-hit-dices div:nth-child(1) span.show-text'),
    ),
    hp: element(by.css('d20md-show-hit-dices div:nth-child(2) span.show-text')),
  },
  type: element(
    by.css('d20md-general-panel table tr:nth-child(1) td:nth-child(2) img'),
  ),
  initiative: element(
    by.css('d20md-general-panel table tr:nth-child(2) td:nth-child(2) span'),
  ),
};
