import {promise} from 'protractor';

import {FramePage} from '../pages/frame.page';
import {IndexPage} from '../pages/index.page';
import {ICredentials, LoginPage} from '../pages/login.page';

import {LoginHelper} from '../helpers/login-helper';

describe('login', () => {
  let framePage: FramePage;
  let indexPage: IndexPage;
  let loginPage: LoginPage;
  let loginHelper: LoginHelper;

  beforeEach(() => {
    framePage = new FramePage();
    indexPage = new IndexPage();
    loginPage = new LoginPage();
    loginHelper = new LoginHelper(framePage, loginPage);
  });

  beforeEach(async () => {
    await indexPage.navigateTo();
  });

  afterAll(async () => {
    loginHelper.logout();
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
    await loginHelper.login();

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
