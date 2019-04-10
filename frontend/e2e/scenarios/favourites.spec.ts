import {FramePage} from '../pages/frame.page';
import {FindMonsterPage, IMonster} from '../pages/find-monster.page';
import {LoginHelper} from '../helpers/login-helper';
import {LoginPage} from '../pages/login.page';
import {FavouritesPage} from '../pages/favourites.page';
import {IMonsterInfo} from '../interfaces/monster/IMonsterInfo';
import {IFindMonsterParams} from '../../src/app/monsters/find/find-monster.service';

describe('favourites', () => {
  let framePage: FramePage;
  let favouritesPage: FavouritesPage;
  let loginHelper: LoginHelper;

  beforeEach(() => {
    framePage = new FramePage();
    favouritesPage = new FavouritesPage();
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

    it('should not show favourite marks when not logged in', async () => {
      await loginHelper.logout();

      const monsters = await findMonsterPage.getResults();

      monsters.forEach(m => expect(m.favourite.added).toBeNull());
    });

    it('should show favourite marks when logged in', async () => {
      await loginHelper.login();
      await framePage.navigateToFindMonsterPage();

      const monsters = await findMonsterPage.getResults();

      monsters.forEach(m => expect(m.favourite).not.toBeNull());
    });

    async function assertFavouriteOnFindPage(
      added: boolean,
    ): Promise<IMonster> {
      const monsters = await findMonsterPage.getResults();
      expect(monsters.length).toBeGreaterThan(0);
      const monster = monsters[0];
      expect(monster.favourite.added).toEqual(added);
      return monster;
    }

    it('should add and remove favourite', async () => {
      await loginHelper.login();
      await framePage.navigateToFindMonsterPage();

      let monster = await assertFavouriteOnFindPage(false);
      await monster.favourite.click();
      await assertFavouriteOnFindPage(true);

      await framePage.navigateToFavourites();
      await favouritesPage.assertIsOnThePage();

      let isMonsterInFavourites = await favouritesPage.isMonsterPresent(
        monster.name,
      );
      expect(isMonsterInFavourites).toBeTruthy();

      await framePage.navigateToFindMonsterPage();
      monster = await assertFavouriteOnFindPage(true);
      await monster.favourite.click();
      monster = await assertFavouriteOnFindPage(false);

      await framePage.navigateToFavourites();
      isMonsterInFavourites = await favouritesPage.isMonsterPresent(
        monster.name,
      );
      expect(isMonsterInFavourites).toBeFalsy();
    });
  });
});