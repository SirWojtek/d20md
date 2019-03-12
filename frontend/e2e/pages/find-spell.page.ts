import {browser, element, by, ElementFinder} from 'protractor';

export interface ISearchCriterias {
  name?: string;
  type?: string;
  range?: string;
  class?: string;
}

export interface IFoundSpellClass {
  name: string;
  level: number;
}

export interface IFoundSpell {
  name: string;
  type: string;
  range: string;
  classes: IFoundSpellClass[];
  click: () => Promise<void>;
}

export class FindSpellPage {
  private pageUrl = '/spells/find';

  private form = {
    nameInput: element(by.css('input#name')),
    type: {
      element: element(by.css('select#type')),
      options: {
        any: element(by.cssContainingText('select#type option', 'Any')),
        abjuration: element(
          by.cssContainingText('select#type option', 'Abjuration'),
        ),
      },
    },
    range: {
      element: element(by.css('select#range')),
      options: {
        any: element(by.cssContainingText('select#range option', 'Any')),
        medium: element(by.cssContainingText('select#range option', 'Medium')),
      },
    },
    classInput: element(by.css('input#class')),
  };

  private miniatureElements = element.all(by.css('d20md-spell-miniature'));
  private nameSelector = 'h3.panel-title';
  private typeSelector = 'd20md-spell-type-element span';
  private rangeSelector = 'd20md-spell-range-element .bar-border';
  private classSelectors = {
    listSelector: 'd20md-spell-level-element .single-level',
    nameSelector: '>span',
    levelSelector: 'span.level',
  };

  async navigateTo() {
    await browser.get(this.pageUrl);
  }

  async clearSearchCriteria() {
    await this.form.nameInput.clear();
    await this.form.type.options.any.click();
    await this.form.range.options.any.click();
    await this.form.classInput.clear();
  }

  async setSearchCriteria(criterias: ISearchCriterias) {
    if (criterias.name) {
      await this.form.nameInput.sendKeys(criterias.name);
    }
    if (criterias.type) {
      const option = this.form.type.options[criterias.type];
      if (!option) {
        throw Error(`Cannot find type option: ${criterias.type}`);
      }
      await option.click();
    }
    if (criterias.range) {
      const option = this.form.range.options[criterias.range];
      if (!option) {
        throw Error(`Cannot find range option: ${criterias.range}`);
      }
      await option.click();
    }
    if (criterias.class) {
      await this.form.classInput.sendKeys(criterias.class);
    }
  }

  async getResults(): Promise<IFoundSpell[]> {
    const result = await this.miniatureElements.map(el => ({
      name: el.$(this.nameSelector).getText(),
      type: el.$(this.typeSelector).getText(),
      range: el.$(this.rangeSelector).getAttribute('title'),
      class: this.getClass(el),
      click: el.click,
    }));

    return result as IFoundSpell[];
  }

  private async getClass(
    miniature: ElementFinder,
  ): Promise<IFoundSpellClass[]> {
    const classes = await miniature
      .all(by.css(this.classSelectors.listSelector))
      .map(el => ({
        name: el.$(this.classSelectors.nameSelector).getText(),
        level: el.$(this.classSelectors.levelSelector).getText(),
      }));

    return classes as IFoundSpellClass[];
  }
}
