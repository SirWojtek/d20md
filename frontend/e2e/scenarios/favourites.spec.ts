import {FramePage} from '../pages/frame.page';
import {FindMonsterPage} from '../pages/find-monster.page';

describe('favourites', () => {
  let framePage: FramePage;

  beforeEach(() => {
    framePage = new FramePage();
  });

  describe('find monster', () => {
    let findMonsterPage: FindMonsterPage;

    beforeEach(() => {
      findMonsterPage = new FindMonsterPage();
    });

    it('should not show favourite marks when not loged in', async () => {
      await findMonsterPage.navigateTo();

      const isLoggedIn = await framePage.isLoggedIn();
      if (isLoggedIn) {
        await framePage.logout();
      }
      await findMonsterPage.clearSearchCriteria();

      const monsters = await findMonsterPage.getResults();

      monsters.forEach(m => expect(m.favourite).toBeNull());
    });

    // it('should show favourite marks when loged in', async () => {
    // await framePage.logout();
    // await findMonsterPage.navigateTo();
    // await findMonsterPage.clearSearchCriteria();

    // const monsters = await findMonsterPage.getResults();

    // monsters.forEach(m => expect(m.favourite).toBeNull());
    // });
  });
});
