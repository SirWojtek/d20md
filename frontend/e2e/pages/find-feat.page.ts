import {browser, element, by} from 'protractor';
import {
  IFavouritesInfo,
  FavouriteElements,
} from './elements/favourites/favourites.elements';

export interface ISearchCriterias {
  phrase?: string;
  type?: string;
}

export interface IFoundFeat {
  name: string;
  type: string;
  click: () => Promise<void>;
  favourite: IFavouritesInfo;
}

export class FindFeatPage {
  private pageUrl = '/feats/find';

  private form = {
    phraseInput: element(by.css('input#phrase')),
    type: {
      element: element(by.css('select#type')),
      options: {
        any: element(by.cssContainingText('select#type option', 'Any')),
        general: element(by.cssContainingText('select#type option', 'General')),
      },
    },
  };

  private miniatureElements = element.all(by.css('d20md-feat-miniature'));
  private nameSelector = 'h3.panel-title div';
  private typeSelector = 'div.panel-heading img';

  private favouriteElements = new FavouriteElements();

  async navigateTo() {
    await browser.get(this.pageUrl);
  }

  async navigateToShowPage(name: string): Promise<void> {
    await this.setSearchCriteria({phrase: name});

    const feats = await this.getResults();
    expect(feats.length).toBeGreaterThan(0);
    expect(feats[0].name).toEqual(name);

    await feats[0].click();
  }

  async clearSearchCriteria() {
    await this.form.phraseInput.clear();
    await this.form.type.options.any.click();
  }

  async setSearchCriteria(criterias: ISearchCriterias) {
    if (criterias.phrase) {
      await this.form.phraseInput.sendKeys(criterias.phrase);
    }
    if (criterias.type) {
      const option = this.form.type.options[criterias.type];
      if (!option) {
        throw Error(`Cannot find type option: ${criterias.type}`);
      }
      await option.click();
    }
  }

  async getResults(): Promise<IFoundFeat[]> {
    const result = await this.miniatureElements.map(el => ({
      name: el.$(this.nameSelector).getText(),
      type: el.$(this.typeSelector).getAttribute('title'),
      click: el.click,
      favourite: this.favouriteElements.getFavouriteItems(el),
    }));

    return result as IFoundFeat[];
  }
}
