import {element, by, browser} from 'protractor';

export class ChangePasswordPage {
  private url = '/change-password';

  private newPasswordInput = element(by.css('#new-password'));
  private confirmNewPassword = element(by.css('#repeat-password'));
  private changeButton = element(by.css('#confirm-password-change'));

  async assertChangePasswordPage() {
    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toContain(this.url);
  }

  async changePassword(newPassword: string): Promise<void> {
    await this.newPasswordInput.clear();
    await this.confirmNewPassword.clear();

    await this.newPasswordInput.sendKeys(newPassword);
    await this.confirmNewPassword.sendKeys(newPassword);

    await this.changeButton.click();
  }
}
