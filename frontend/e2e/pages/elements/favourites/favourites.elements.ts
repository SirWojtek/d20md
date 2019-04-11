import {promise, ElementFinder} from 'protractor';

export interface IFavouritesInfo {
  added: boolean | null;
  click: () => promise.Promise<void>;
}

export class FavouriteElements {
  private favouriteSelector = 'd20md-favourites-mark i';
  private favouriteActiveClass = 'fas';

  async getFavouriteItems(el: ElementFinder): Promise<IFavouritesInfo> {
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
