import {
  browser,
  element,
  by,
  ElementArrayFinder,
  ElementFinder,
} from 'protractor';
import {
  FavouriteElements,
  IFavouritesInfo,
} from './elements/favourites/favourites.elements';

export class FavouritesPage {
  private pageUrl = '/dashboard/favourites';

  private favouriteElements = new FavouriteElements();

  private tabs = {
    monsters: element(by.css('ul li #favourite-monsters')),
    spells: element(by.css('ul li #favourite-spells')),
    feats: element(by.css('ul li #favourite-feats')),
  };

  private favouriteTables = {
    monsters: element.all(by.css('table#favourite-monsters-table tbody tr')),
    spells: element.all(by.css('table#favourite-spells-table tbody tr')),
    feats: element.all(by.css('table#favourite-feats-table tbody tr')),
  };

  private nameSearch = {
    monsters: element(by.css('input#name-control')),
    spells: element(by.css('input#name-control')),
    feats: element(by.css('input#name-control')),
  };

  private nameSelector = 'td:nth-child(1)';
  private buttonSelector = 'td:last-child button';

  async assertIsOnThePage() {
    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toContain(this.pageUrl);
  }

  async isMonsterPresent(name: string): Promise<boolean> {
    await this.tabs.monsters.click();
    await this.nameSearch.monsters.clear();
    await this.nameSearch.monsters.sendKeys(name);
    const names = await this.getNames(this.favouriteTables.monsters);
    return names.includes(name);
  }

  async isSpellPresent(name: string): Promise<boolean> {
    await this.tabs.spells.click();
    await this.nameSearch.spells.clear();
    await this.nameSearch.spells.sendKeys(name);
    const names = await this.getNames(this.favouriteTables.spells);
    return names.includes(name);
  }

  async isFeatPresent(name: string): Promise<boolean> {
    await this.tabs.feats.click();
    await this.nameSearch.feats.clear();
    await this.nameSearch.feats.sendKeys(name);
    const names = await this.getNames(this.favouriteTables.feats);
    return names.includes(name);
  }

  async removeMonsterFromFavourites(name: string): Promise<void> {
    await this.tabs.monsters.click();
    await this.nameSearch.monsters.clear();
    await this.nameSearch.monsters.sendKeys(name);

    const row = await this.favouriteTables.monsters.first();
    await row.$(this.buttonSelector).click();
  }

  async removeSpellFromFavourites(name: string): Promise<void> {
    await this.tabs.spells.click();
    await this.nameSearch.spells.clear();
    await this.nameSearch.spells.sendKeys(name);

    await this.favouriteTables.spells.first().click();
  }

  async removeFeatFromFavourites(name: string): Promise<void> {
    await this.tabs.feats.click();
    await this.nameSearch.feats.clear();
    await this.nameSearch.feats.sendKeys(name);

    await this.favouriteTables.feats.first().click();
  }

  private async getNames(table: ElementArrayFinder): Promise<string[]> {
    const result = await table.map(el => el.$(this.nameSelector).getText());

    return result as string[];
  }
}
