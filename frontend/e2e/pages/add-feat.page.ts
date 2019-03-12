import {browser, element, by} from 'protractor';

export class AddFeatPage {
  private url = '/feats/add';

  private nameInput = element(by.css('input#create-name'));
  private createButton = element(by.css('button#add-feat-button'));

  async assertAddPage() {
    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toContain(this.url);
  }

  async create(name: string) {
    await this.nameInput.sendKeys(name);
    await this.createButton.click();
  }
}
