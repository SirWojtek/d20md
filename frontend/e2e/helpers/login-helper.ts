import {FramePage} from '../pages/frame.page';
import {LoginPage} from '../pages/login.page';
import {userCredentials} from '../config/user-credentials';
import {browser} from 'protractor';

export class LoginHelper {
  constructor(
    private framePage: FramePage,
    private loginPage: LoginPage,
    private user = userCredentials,
  ) {}

  async login(): Promise<void> {
    const isLoggedIn = await this.framePage.isLoggedIn();
    if (!isLoggedIn) {
      await this.framePage.clickLoginButton();
      await this.loginPage.login(this.user);
      await browser.waitForAngular();
    }
  }

  async logout(): Promise<void> {
    const isLoggedIn = await this.framePage.isLoggedIn();
    if (isLoggedIn) {
      await this.framePage.logout();
      await browser.waitForAngular();
    }
  }
}
