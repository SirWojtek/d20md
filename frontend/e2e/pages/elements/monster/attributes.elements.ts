import {element, by} from 'protractor';

export const attributesElements = {
  tab: element(by.cssContainingText('ul.nav li a', 'Attributes')),
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
  editButton: element(by.css('d20md-attribute-panel div.edit-button button')),
  editModal: {
    strengthSlider: element(by.css('d20md-modal-base input#strength')),
    dexteritySlider: element(by.css('d20md-modal-base input#dexterity')),
    constitutionSlider: element(by.css('d20md-modal-base input#constitution')),
    intelligenceSlider: element(by.css('d20md-modal-base input#intelligence')),
    wisdomSlider: element(by.css('d20md-modal-base input#wisdom')),
    charismaSlider: element(by.css('d20md-modal-base input#charisma')),
  },
};
