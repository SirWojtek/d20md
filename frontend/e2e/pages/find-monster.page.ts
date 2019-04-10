import {browser, element, by, ElementFinder, promise} from 'protractor';

export interface ISearchCriterias {
  name?: string;
  size?: string;
  type?: string;
}

export interface IMonster {
  name: string;
  size: string;
  type: string;
  cr: number;
  ac: number;
  click: () => Promise<void>;
  favourite: {
    added: boolean;
    click: () => Promise<void>;
  };
}

export class FindMonsterPage {
  private pageUrl = '/monsters/find';

  private form = {
    nameInput: element(by.css('d20md-find-form input#name')),
    size: {
      element: element(by.css('d20md-find-form select#size')),
      options: {
        any: element(
          by.cssContainingText('d20md-find-form select#size option', 'Any'),
        ),
        medium: element(
          by.cssContainingText('d20md-find-form select#size option', 'Medium'),
        ),
      },
    },
    type: {
      element: element(by.css('d20md-find-form select#type')),
      options: {
        any: element(
          by.cssContainingText('d20md-find-form select#type option', 'Any'),
        ),
        animal: element(
          by.cssContainingText('d20md-find-form select#type option', 'Animal'),
        ),
      },
    },
  };

  private miniatureElements = element.all(by.css('d20md-find-miniature'));
  private nameSelector = 'h3.name';
  private sizeSelector = 'd20md-size-element h3';
  private typeSelector = 'd20md-type-element img';
  private crSelector = 'd20md-armor-element span';
  private acSelector = 'd20md-cr-element span';
  private favouriteSelector = 'd20md-favourites-mark i';
  private favouriteActiveClass = 'fas';

  async navigateTo() {
    await browser.get(this.pageUrl);
  }

  async setSearchCriteria(criterias: ISearchCriterias) {
    if (criterias.name) {
      await this.form.nameInput.sendKeys(criterias.name);
    }
    if (criterias.size) {
      const option = this.form.size.options[criterias.size];
      if (!option) {
        throw Error(`Cannot find size option: ${criterias.size}`);
      }
      await option.click();
    }
    if (criterias.type) {
      const option = this.form.type.options[criterias.type];
      if (!option) {
        throw Error(`Cannot find type option: ${criterias.type}`);
      }
      await option.click();
    }
  }

  async clearSearchCriteria() {
    await this.form.nameInput.clear();
    await this.form.size.options.any.click();
    await this.form.type.options.any.click();
  }

  async getResults(): Promise<IMonster[]> {
    const result = await this.miniatureElements.map(el => ({
      name: el.$(this.nameSelector).getText(),
      size: el.$(this.sizeSelector).getText(),
      type: el.$(this.typeSelector).getAttribute('title'),
      cr: el.$(this.crSelector).getText(),
      ac: el.$(this.acSelector).getText(),
      click: el.$(this.nameSelector).click,
      favourite: this.getFavouriteItems(el),
    }));

    return result as IMonster[];
  }

  private async getFavouriteItems(
    el: ElementFinder,
  ): Promise<{
    added: boolean;
    click: () => promise.Promise<void>;
  }> {
    const favouriteItem = el.$(this.favouriteSelector);

    if (!(await favouriteItem.isPresent())) {
      return Promise.resolve({
        added: null,
        click: () => {
          throw new Error('Favourite mark not clickable');
        },
      });
    }

    return favouriteItem.getAttribute('class').then(classes => ({
      added: classes.includes(this.favouriteActiveClass),
      click: favouriteItem.click,
    }));
  }
}
