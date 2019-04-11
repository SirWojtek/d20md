import {FramePage} from '../pages/frame.page';
import {FavouritesPage} from '../pages/favourites.page';
import {LoginHelper} from '../helpers/login-helper';
import {LoginPage} from '../pages/login.page';
import {ShowMonsterPage} from '../pages/show-monster.page';
import {IMonsterInfo} from '../interfaces/monster/IMonsterInfo';
import {FindMonsterPage} from '../pages/find-monster.page';
import {IFavouritesInfo} from '../pages/elements/favourites/favourites.elements';

const testMonsterName = 'Wolf';

describe('favourites show', () => {
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
    let showMonsterPage: ShowMonsterPage;

    beforeEach(() => {
      findMonsterPage = new FindMonsterPage();
      showMonsterPage = new ShowMonsterPage();
    });

    beforeEach(async () => {
      await findMonsterPage.navigateTo();
    });

    async function assertFavouriteOnShowPage(
      added: boolean,
    ): Promise<IFavouritesInfo> {
      const favourite = await showMonsterPage.getFavouritesInfo();
      expect(favourite.added).toEqual(added);
      return favourite;
    }

    it('should not show favourite marks when not logged in', async () => {
      await loginHelper.logout();
      await framePage.navigateToFindMonsterPage();
      await findMonsterPage.navigateToShowPage(testMonsterName);

      const favourite = await showMonsterPage.getFavouritesInfo();
      expect(favourite.added).toBeNull();
    });

    it('should show favourite marks when logged in', async () => {
      await loginHelper.login();
      await framePage.navigateToFindMonsterPage();
      await findMonsterPage.navigateToShowPage(testMonsterName);

      await assertFavouriteOnShowPage(false);
    });

    it('should add and remove favourite', async () => {
      await loginHelper.login();
      await framePage.navigateToFindMonsterPage();
      await findMonsterPage.navigateToShowPage(testMonsterName);

      let favourite = await assertFavouriteOnShowPage(false);
      await favourite.click();
      await assertFavouriteOnShowPage(true);

      await framePage.navigateToFavourites();
      await favouritesPage.assertIsOnThePage();

      let isMonsterInFavourites = await favouritesPage.isMonsterPresent(
        testMonsterName,
      );
      expect(isMonsterInFavourites).toBeTruthy();

      await framePage.navigateToFindMonsterPage();
      await findMonsterPage.navigateToShowPage(testMonsterName);
      favourite = await assertFavouriteOnShowPage(true);
      await favourite.click();
      favourite = await assertFavouriteOnShowPage(false);

      await framePage.navigateToFavourites();
      isMonsterInFavourites = await favouritesPage.isMonsterPresent(
        testMonsterName,
      );
      expect(isMonsterInFavourites).toBeFalsy();
    });
  });
});
