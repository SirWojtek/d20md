import {element, by} from 'protractor';

export const skillsElements = {
  tab: element(by.cssContainingText('ul.nav li a', 'Skills')),
  showNotLearnedSkills: element(
    by.css('d20md-show-skill input#show-not-learned-skills'),
  ),
  // NOTE: indicies valid only if all skills are shown
  skill: {
    hide: {
      modifier: element(
        by.css('d20md-show-skill table tr:nth-child(21) td:nth-child(2)'),
      ),
      total: element(
        by.css('d20md-show-skill table tr:nth-child(21) td:nth-child(3)'),
      ),
    },
    listen: {
      modifier: element(
        by.css('d20md-show-skill table tr:nth-child(34) td:nth-child(2)'),
      ),
      total: element(
        by.css('d20md-show-skill table tr:nth-child(34) td:nth-child(3)'),
      ),
    },
    moveSilently: {
      modifier: element(
        by.css('d20md-show-skill table tr:nth-child(35) td:nth-child(2)'),
      ),
      total: element(
        by.css('d20md-show-skill table tr:nth-child(35) td:nth-child(3)'),
      ),
    },
    spot: {
      modifier: element(
        by.css('d20md-show-skill table tr:nth-child(44) td:nth-child(2)'),
      ),
      total: element(
        by.css('d20md-show-skill table tr:nth-child(44) td:nth-child(3)'),
      ),
    },
    survival: {
      modifier: element(
        by.css('d20md-show-skill table tr:nth-child(45) td:nth-child(2)'),
      ),
      total: element(
        by.css('d20md-show-skill table tr:nth-child(45) td:nth-child(3)'),
      ),
    },
  },
};
