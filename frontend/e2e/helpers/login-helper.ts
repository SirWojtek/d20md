import {FramePage} from '../pages/frame.page';
import {LoginPage} from '../pages/login.page';
import {userCredentials} from '../config/user-credentials';

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
    }
  }

  async logout(): Promise<void> {
    const isLoggedIn = await this.framePage.isLoggedIn();
    if (isLoggedIn) {
      await this.framePage.logout();
    }
  }
}
