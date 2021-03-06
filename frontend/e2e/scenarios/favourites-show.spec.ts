import {FramePage} from '../pages/frame.page';
import {FavouritesPage} from '../pages/favourites.page';
import {LoginHelper} from '../helpers/login-helper';
import {LoginPage} from '../pages/login.page';
import {ShowMonsterPage} from '../pages/show-monster.page';
import {FindMonsterPage} from '../pages/find-monster.page';
import {IFavouritesInfo} from '../pages/elements/favourites/favourites.elements';
import {FindSpellPage} from '../pages/find-spell.page';
import {ShowSpellPage} from '../pages/show-spell.page';
import {FindFeatPage} from '../pages/find-feat.page';
import {ShowFeatPage} from '../pages/show-feat.page';

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

    let testMonsterName;

    beforeEach(() => {
      findMonsterPage = new FindMonsterPage();
      showMonsterPage = new ShowMonsterPage();

      testMonsterName = 'Wolf';
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

  describe('spell', () => {
    let findSpellPage: FindSpellPage;
    let showSpellPage: ShowSpellPage;

    let testSpellName;

    beforeEach(() => {
      findSpellPage = new FindSpellPage();
      showSpellPage = new ShowSpellPage();

      testSpellName = 'Magic Missile';
    });

    beforeEach(async () => {
      await findSpellPage.navigateTo();
    });

    async function assertFavouriteOnShowPage(
      added: boolean,
    ): Promise<IFavouritesInfo> {
      const favourite = await showSpellPage.getFavouritesInfo();
      expect(favourite.added).toEqual(added);
      return favourite;
    }

    it('should not show favourite marks when not logged in', async () => {
      await loginHelper.logout();
      await framePage.navigateToFindSpellPage();
      await findSpellPage.navigateToShowPage(testSpellName);

      const favourite = await showSpellPage.getFavouritesInfo();
      expect(favourite.added).toBeNull();
    });

    it('should show favourite marks when logged in', async () => {
      await loginHelper.login();
      await framePage.navigateToFindSpellPage();
      await findSpellPage.navigateToShowPage(testSpellName);

      await assertFavouriteOnShowPage(false);
    });

    it('should add and remove favourite', async () => {
      await loginHelper.login();
      await framePage.navigateToFindSpellPage();
      await findSpellPage.navigateToShowPage(testSpellName);

      let favourite = await assertFavouriteOnShowPage(false);
      await favourite.click();
      await assertFavouriteOnShowPage(true);

      await framePage.navigateToFavourites();
      await favouritesPage.assertIsOnThePage();

      let isSpellInFavourites = await favouritesPage.isSpellPresent(
        testSpellName,
      );
      expect(isSpellInFavourites).toBeTruthy();

      await framePage.navigateToFindSpellPage();
      await findSpellPage.navigateToShowPage(testSpellName);
      favourite = await assertFavouriteOnShowPage(true);
      await favourite.click();
      favourite = await assertFavouriteOnShowPage(false);

      await framePage.navigateToFavourites();
      isSpellInFavourites = await favouritesPage.isSpellPresent(testSpellName);
      expect(isSpellInFavourites).toBeFalsy();
    });
  });

  describe('feat', () => {
    let findFeatPage: FindFeatPage;
    let showFeatPage: ShowFeatPage;

    let testFeatName;

    beforeEach(() => {
      findFeatPage = new FindFeatPage();
      showFeatPage = new ShowFeatPage();

      testFeatName = 'Power Attack';
    });

    beforeEach(async () => {
      await findFeatPage.navigateTo();
    });

    async function assertFavouriteOnShowPage(
      added: boolean,
    ): Promise<IFavouritesInfo> {
      const favourite = await showFeatPage.getFavouritesInfo();
      expect(favourite.added).toEqual(added);
      return favourite;
    }

    it('should not show favourite marks when not logged in', async () => {
      await loginHelper.logout();
      await framePage.navigateToFindFeatPage();
      await findFeatPage.navigateToShowPage(testFeatName);

      const favourite = await showFeatPage.getFavouritesInfo();
      expect(favourite.added).toBeNull();
    });

    it('should show favourite marks when logged in', async () => {
      await loginHelper.login();
      await framePage.navigateToFindFeatPage();
      await findFeatPage.navigateToShowPage(testFeatName);

      await assertFavouriteOnShowPage(false);
    });

    it('should add and remove favourite', async () => {
      await loginHelper.login();
      await framePage.navigateToFindFeatPage();
      await findFeatPage.navigateToShowPage(testFeatName);

      let favourite = await assertFavouriteOnShowPage(false);
      await favourite.click();
      await assertFavouriteOnShowPage(true);

      await framePage.navigateToFavourites();
      await favouritesPage.assertIsOnThePage();

      let isFeatInFavourites = await favouritesPage.isFeatPresent(testFeatName);
      expect(isFeatInFavourites).toBeTruthy();

      await framePage.navigateToFindFeatPage();
      await findFeatPage.navigateToShowPage(testFeatName);
      favourite = await assertFavouriteOnShowPage(true);
      await favourite.click();
      favourite = await assertFavouriteOnShowPage(false);

      await framePage.navigateToFavourites();
      isFeatInFavourites = await favouritesPage.isFeatPresent(testFeatName);
      expect(isFeatInFavourites).toBeFalsy();
    });
  });
});
