import {LoginHelper} from '../helpers/login-helper';
import {LoginPage} from '../pages/login.page';
import {FavouritesPage} from '../pages/favourites.page';
import {FramePage} from '../pages/frame.page';
import {FindMonsterPage, IMonster} from '../pages/find-monster.page';

describe('favourites dashboard', () => {
  let framePage: FramePage;
  let favouritesPage: FavouritesPage;
  let loginHelper: LoginHelper;

  beforeEach(() => {
    framePage = new FramePage();
    favouritesPage = new FavouritesPage();
    loginHelper = new LoginHelper(framePage, new LoginPage());
  });

  describe('monster', () => {
    let findMonsterPage: FindMonsterPage;

    beforeEach(() => {
      findMonsterPage = new FindMonsterPage();
    });

    beforeEach(async () => {
      await findMonsterPage.navigateTo();
      await findMonsterPage.clearSearchCriteria();
    });

    it('should add and remove favourite', async () => {
      await loginHelper.login();
      await framePage.navigateToFindMonsterPage();

      const monsters = await findMonsterPage.getResults();
      expect(monsters.length).toBeGreaterThan(0);
      const monster = monsters[0];
      expect(monster.favourite.added).toEqual(false);
      await monster.favourite.click();

      await framePage.navigateToFavourites();
      await favouritesPage.assertIsOnThePage();

      let isMonsterInFavourites = await favouritesPage.isMonsterPresent(
        monster.name,
      );
      expect(isMonsterInFavourites).toBeTruthy();

      await favouritesPage.removeMonsterFromFavourites(monster.name);

      isMonsterInFavourites = await favouritesPage.isMonsterPresent(
        monster.name,
      );
      expect(isMonsterInFavourites).toBeFalsy();
    });
  });
});
