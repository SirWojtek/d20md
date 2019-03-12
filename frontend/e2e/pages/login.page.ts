import {element, by} from 'protractor';

export interface ICredentials {
  email: string;
  password: string;
}

export class LoginPage {
  private emailInput = element(by.css('.login-container #email'));
  private passwordInput = element(by.css('.login-container #password'));
  private loginButton = element(by.css('.login-container #login-button'));

  async login(creds: ICredentials): Promise<void> {
    await this.emailInput.clear();
    await this.passwordInput.clear();

    await this.emailInput.sendKeys(creds.email);
    await this.passwordInput.sendKeys(creds.password);
    await this.loginButton.click();
  }
}
