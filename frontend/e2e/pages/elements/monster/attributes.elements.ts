import {element, by} from 'protractor';

export const attributesElements = {
  strength: {
    value: element(
      by.css('d20md-show-attribute table tr:nth-child(1) td:nth-child(2)'),
    ),
    modifier: element(
      by.css('d20md-show-attribute table tr:nth-child(1) td:nth-child(3)'),
    ),
  },
  dexterity: {
    value: element(
      by.css('d20md-show-attribute table tr:nth-child(2) td:nth-child(2)'),
    ),
    modifier: element(
      by.css('d20md-show-attribute table tr:nth-child(2) td:nth-child(3)'),
    ),
  },
  constitution: {
    value: element(
      by.css('d20md-show-attribute table tr:nth-child(3) td:nth-child(2)'),
    ),
    modifier: element(
      by.css('d20md-show-attribute table tr:nth-child(3) td:nth-child(3)'),
    ),
  },
  wisdom: {
    value: element(
      by.css('d20md-show-attribute table tr:nth-child(4) td:nth-child(2)'),
    ),
    modifier: element(
      by.css('d20md-show-attribute table tr:nth-child(4) td:nth-child(3)'),
    ),
  },
  intelligence: {
    value: element(
      by.css('d20md-show-attribute table tr:nth-child(5) td:nth-child(2)'),
    ),
    modifier: element(
      by.css('d20md-show-attribute table tr:nth-child(5) td:nth-child(3)'),
    ),
  },
  charisma: {
    value: element(
      by.css('d20md-show-attribute table tr:nth-child(6) td:nth-child(2)'),
    ),
    modifier: element(
      by.css('d20md-show-attribute table tr:nth-child(6) td:nth-child(3)'),
    ),
  },
};
