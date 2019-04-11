import {browser, promise, ElementFinder} from 'protractor';
import {IFeatInfo} from '../interfaces/feat/IFeatInfo';
import {frameElements} from './elements/feat/frame.elements';
import {normalElements} from './elements/feat/normal.elements';
import {specialElements} from './elements/feat/special.elements';
import {benefitElements} from './elements/feat/benefit.elements';
import {otherElements} from './elements/feat/other.elements';
import {
  FavouriteElements,
  IFavouritesInfo,
} from './elements/favourites/favourites.elements';

export class ShowFeatPage {
  private pagePrefixUrl = '/feats/show';

  private favouriteElements = new FavouriteElements();

  async getFeatInfo(): Promise<IFeatInfo> {
    await this.assertShowFeatPage();

    const [name, benefit] = await promise.all([
      frameElements.name.getText(),
      benefitElements.text.getText(),
    ]);

    const type = await otherElements.type.getAttribute('title');

    const normal = await this.getIfPresent(
      normalElements.tab,
      normalElements.text,
    );

    const special = await this.getIfPresent(
      specialElements.tab,
      specialElements.text,
    );

    return {
      name,
      type,
      benefit,
      normal,
      special,
    };
  }

  async getFavouritesInfo(): Promise<IFavouritesInfo> {
    return this.favouriteElements.getFavouriteItems(frameElements.base);
  }

  private async getIfPresent(
    tab: ElementFinder,
    text: ElementFinder,
  ): Promise<string | null> {
    const isPresent = await tab.isPresent();
    if (!isPresent) {
      return null;
    }
    await tab.click();
    return text.getText();
  }

  private async assertShowFeatPage() {
    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toContain(this.pagePrefixUrl);
  }
}
