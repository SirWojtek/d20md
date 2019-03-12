import {element, by} from 'protractor';

export const armorElements = {
  tab: element(by.cssContainingText('ul.nav li a', 'Defences')),
  types: {
    base: element(
      by.css(
        'd20md-show-armor table.table-striped tr:nth-child(1) td:nth-child(2)',
      ),
    ),
    armor: element(
      by.css(
        'd20md-show-armor table.table-striped tr:nth-child(2) td:nth-child(2)',
      ),
    ),
    shield: element(
      by.css(
        'd20md-show-armor table.table-striped tr:nth-child(3) td:nth-child(2)',
      ),
    ),
    dexterity: element(
      by.css(
        'd20md-show-armor table.table-striped tr:nth-child(4) td:nth-child(2)',
      ),
    ),
    size: element(
      by.css(
        'd20md-show-armor table.table-striped tr:nth-child(5) td:nth-child(2)',
      ),
    ),
    enhancement: element(
      by.css(
        'd20md-show-armor table.table-striped tr:nth-child(6) td:nth-child(2)',
      ),
    ),
    deflection: element(
      by.css(
        'd20md-show-armor table.table-striped tr:nth-child(7) td:nth-child(2)',
      ),
    ),
    natural: element(
      by.css(
        'd20md-show-armor table.table-striped tr:nth-child(8) td:nth-child(2)',
      ),
    ),
  },
  summary: {
    touch: element(
      by.css(
        'd20md-show-armor table.table-bordered tr:nth-child(1) td:nth-child(1)',
      ),
    ),
    flatFooted: element(
      by.css(
        'd20md-show-armor table.table-bordered tr:nth-child(1) td:nth-child(2)',
      ),
    ),
    total: element(
      by.css(
        'd20md-show-armor table.table-bordered tr:nth-child(1) td:nth-child(3)',
      ),
    ),
  },
};
