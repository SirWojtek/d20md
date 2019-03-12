import {browser, element, by} from 'protractor';

export class AddMonsterPage {
  private url = '/monsters/add';

  private nameInput = element(by.css('input#create-name'));
  private hdInput = element(by.css('input#create-hit-dice'));
  private createButton = element(by.css('button#add-monster-button'));

  async assertAddPage() {
    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toContain(this.url);
  }

  async create(name: string, type?: string, hd?: number) {
    await this.nameInput.sendKeys(name);

    if (type) {
      const dropdownElement = element(
        by.cssContainingText('select#create-type option', type),
      );
      if (!dropdownElement.isPresent()) {
        throw Error(`Cannot find type ${type}`);
      }
      await dropdownElement.click();
    }
    if (hd) {
      await this.hdInput.clear();
      await this.hdInput.sendKeys(hd);
    }

    await this.createButton.click();
  }
}
