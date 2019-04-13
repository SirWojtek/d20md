import {LoginHelper} from '../helpers/login-helper';
import {LoginPage} from '../pages/login.page';
import {FavouritesPage} from '../pages/favourites.page';
import {FramePage} from '../pages/frame.page';
import {FindMonsterPage} from '../pages/find-monster.page';
import {FindSpellPage} from '../pages/find-spell.page';
import {FindFeatPage} from '../pages/find-feat.page';

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

  describe('spell', () => {
    let findSpellPage: FindSpellPage;

    beforeEach(() => {
      findSpellPage = new FindSpellPage();
    });

    beforeEach(async () => {
      await findSpellPage.navigateTo();
      await findSpellPage.clearSearchCriteria();
    });

    it('should add and remove favourite', async () => {
      await loginHelper.login();
      await framePage.navigateToFindSpellPage();

      const spells = await findSpellPage.getResults();
      expect(spells.length).toBeGreaterThan(0);
      const spell = spells[0];
      expect(spell.favourite.added).toEqual(false);
      await spell.favourite.click();

      await framePage.navigateToFavourites();
      await favouritesPage.assertIsOnThePage();

      let isSpellInFavourites = await favouritesPage.isSpellPresent(spell.name);
      expect(isSpellInFavourites).toBeTruthy();

      await favouritesPage.removeSpellFromFavourites(spell.name);

      isSpellInFavourites = await favouritesPage.isSpellPresent(spell.name);
      expect(isSpellInFavourites).toBeFalsy();
    });
  });

  describe('feat', () => {
    let findFeatPage: FindFeatPage;

    beforeEach(() => {
      findFeatPage = new FindFeatPage();
    });

    beforeEach(async () => {
      await findFeatPage.navigateTo();
      await findFeatPage.clearSearchCriteria();
    });

    it('should add and remove favourite', async () => {
      await loginHelper.login();
      await framePage.navigateToFindFeatPage();

      const feats = await findFeatPage.getResults();
      expect(feats.length).toBeGreaterThan(0);
      const feat = feats[0];
      expect(feat.favourite.added).toEqual(false);
      await feat.favourite.click();

      await framePage.navigateToFavourites();
      await favouritesPage.assertIsOnThePage();

      let isFeatInFavourites = await favouritesPage.isFeatPresent(feat.name);
      expect(isFeatInFavourites).toBeTruthy();

      await favouritesPage.removeFeatFromFavourites(feat.name);

      isFeatInFavourites = await favouritesPage.isFeatPresent(feat.name);
      expect(isFeatInFavourites).toBeFalsy();
    });
  });
});
