import { by, browser, element, promise } from 'protractor';

export interface IFeatureItem {
  title: string;
}

export interface IShortcutButtonState {
  enabled: boolean;
}

export interface IShortcutButtons {
  searchMonster: IShortcutButtonState;
  addMonster: IShortcutButtonState;
}

export class IndexPage {
  private indexUrl = '/';

  private featureItemHeaderElements = element.all(by.css('d20md-feature-item h3'));
  private searchButton = element(by.css('#search-monster-button'));
  private addButton = element(by.css('#add-monster-button'));

  async navigateTo() {
    return browser.get(this.indexUrl);
  }

  async getFeatureItems(): Promise<IFeatureItem[]> {
    const headerTexts = await this.featureItemHeaderElements.map(el => el.getText());

    return headerTexts
      .map(text => String(text))
      .map(title => ({ title }));
  }

  async getShortcutButtons(): Promise<IShortcutButtons> {
    const [ searchBtnEnabled, addBtnEnabled ] = await promise.all([
      this.searchButton.isEnabled(),
      this.addButton.isEnabled()
    ]);

    return {
      searchMonster: { enabled: searchBtnEnabled },
      addMonster: { enabled: addBtnEnabled },
    };
  }
}
