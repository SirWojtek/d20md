import {v4 as uuid} from 'uuid';

import {FramePage} from '../pages/frame.page';
import {IndexPage} from '../pages/index.page';
import {ICredentials, LoginPage} from '../pages/login.page';

import {userCredentials} from '../config/user-credentials';
import {ChangePasswordPage} from '../pages/change-password.page';
import {LoginHelper} from '../helpers/login-helper';

describe('change password', () => {
  let framePage: FramePage;
  let indexPage: IndexPage;
  let loginPage: LoginPage;
  let changePasswordPage: ChangePasswordPage;
  let loginHelper: LoginHelper;

  let user: ICredentials;

  let newPassword: string;

  beforeAll(() => {
    newPassword = 'test-password-' + uuid();
  });

  beforeEach(() => {
    framePage = new FramePage();
    indexPage = new IndexPage();
    loginPage = new LoginPage();
    changePasswordPage = new ChangePasswordPage();
    loginHelper = new LoginHelper(framePage, loginPage);

    user = userCredentials;
  });

  beforeEach(async () => {
    await indexPage.navigateTo();
  });

  afterAll(async () => {
    await loginHelper.logout();
  });

  it('should change password of logged user', async () => {
    let isLoggedIn = await framePage.isLoggedIn();
    expect(isLoggedIn).toBeFalsy();

    await framePage.clickLoginButton();
    await loginPage.login(user);
    isLoggedIn = await framePage.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();

    await framePage.navigateToChangePasswordPage();
    await changePasswordPage.assertChangePasswordPage();

    await changePasswordPage.changePassword(newPassword);

    await framePage.logout();

    await framePage.clickLoginButton();
    await loginPage.login(user);
    isLoggedIn = await framePage.isLoggedIn();
    expect(isLoggedIn).toBeFalsy();

    await loginPage.login({...user, password: newPassword});
    isLoggedIn = await framePage.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();

    await framePage.navigateToChangePasswordPage();
    await changePasswordPage.changePassword(user.password);
  });
});
