import {FramePage} from '../pages/frame.page';
import {FindMonsterPage} from '../pages/find-monster.page';
import {LoginHelper} from '../helpers/login-helper';
import {LoginPage} from '../pages/login.page';

describe('favourites', () => {
  let framePage: FramePage;
  let loginHelper: LoginHelper;

  beforeEach(() => {
    framePage = new FramePage();
    loginHelper = new LoginHelper(framePage, new LoginPage());
  });

  describe('find monster', () => {
    let findMonsterPage: FindMonsterPage;

    beforeEach(() => {
      findMonsterPage = new FindMonsterPage();
    });

    beforeEach(async () => {
      await findMonsterPage.navigateTo();
      await findMonsterPage.clearSearchCriteria();
    });

    it('should not show favourite marks when not loged in', async () => {
      await loginHelper.logout();

      const monsters = await findMonsterPage.getResults();

      monsters.forEach(m => expect(m.favourite).toBeNull());
    });

    it('should show favourite marks when loged in', async () => {
      await loginHelper.login();
      await findMonsterPage.navigateTo();

      const monsters = await findMonsterPage.getResults();

      monsters.forEach(m => expect(m.favourite).not.toBeNull());
    });
  });
});
