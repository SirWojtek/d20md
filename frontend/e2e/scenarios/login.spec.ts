import {promise} from 'protractor';

import {FramePage} from '../pages/frame.page';
import {IndexPage} from '../pages/index.page';
import {ICredentials, LoginPage} from '../pages/login.page';

import {userCredentials} from '../config/user-credentials';

describe('login', () => {
  let framePage: FramePage;
  let indexPage: IndexPage;
  let loginPage: LoginPage;

  let user: ICredentials;

  beforeEach(() => {
    framePage = new FramePage();
    indexPage = new IndexPage();
    loginPage = new LoginPage();

    user = userCredentials;
  });

  beforeEach(async () => {
    await indexPage.navigateTo();
  });

  afterAll(async () => {
    const isLoggedIn = await framePage.isLoggedIn();
    if (isLoggedIn) {
      await framePage.logout();
    }
  });

  it('should be not logged in', async () => {
    const [
      isLoggedIn,
      canCreate,
      canEnterDashboard,
      canEnterSettings,
    ] = await promise.all([
      framePage.isLoggedIn(),
      framePage.canCreate(),
      framePage.canEnterDashboard(),
      framePage.canEnterSettings(),
    ]);

    expect(isLoggedIn).toBeFalsy();
    expect(canCreate).toBeFalsy();
    expect(canEnterDashboard).toBeFalsy();
    expect(canEnterSettings).toBeFalsy();
  });

  it('should log in', async () => {
    await framePage.clickLoginButton();
    await loginPage.login(user);

    const [
      isLoggedIn,
      canCreate,
      canEnterDashboard,
      canEnterSettings,
    ] = await promise.all([
      framePage.isLoggedIn(),
      framePage.canCreate(),
      framePage.canEnterDashboard(),
      framePage.canEnterSettings(),
    ]);

    expect(isLoggedIn).toBeTruthy();
    expect(canCreate).toBeTruthy();
    expect(canEnterDashboard).toBeTruthy();
    expect(canEnterSettings).toBeTruthy();
  });
});
