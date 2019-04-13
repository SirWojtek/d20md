import {IndexPage} from '../pages/index.page';
import {FramePage} from '../pages/frame.page';
import {LoginPage} from '../pages/login.page';
import {LoginHelper} from '../helpers/login-helper';

describe('Index', () => {
  let indexPage: IndexPage;

  let loginHelper: LoginHelper;

  beforeEach(async () => {
    indexPage = new IndexPage();
    loginHelper = new LoginHelper(new FramePage(), new LoginPage());
    await indexPage.navigateTo();
  });

  it('should display', async () => {
    await loginHelper.logout();

    const featureItems = await indexPage.getFeatureItems();
    expect(featureItems.length).toEqual(6);

    const shortcutButtons = await indexPage.getShortcutButtons();
    expect(shortcutButtons.addMonster.enabled).toBeFalsy();
    expect(shortcutButtons.searchMonster.enabled).toBeTruthy();
  });
});
