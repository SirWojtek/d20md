import {FramePage} from '../pages/frame.page';
import {FindMonsterPage, IMonster} from '../pages/find-monster.page';
import {LoginHelper} from '../helpers/login-helper';
import {LoginPage} from '../pages/login.page';
import {FavouritesPage} from '../pages/favourites.page';
import {IMonsterInfo} from '../interfaces/monster/IMonsterInfo';
import {IFindMonsterParams} from '../../src/app/monsters/find/find-monster.service';
import {FindSpellPage, IFoundSpell} from '../pages/find-spell.page';
import {FindFeatPage, IFoundFeat} from '../pages/find-feat.page';

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

  describe('find spell', () => {
    let findSpellPage: FindSpellPage;

    beforeEach(() => {
      findSpellPage = new FindSpellPage();
    });

    beforeEach(async () => {
      await findSpellPage.navigateTo();
      await findSpellPage.clearSearchCriteria();
    });

    it('should not show favourite marks when not logged in', async () => {
      await loginHelper.logout();

      const spells = await findSpellPage.getResults();

      spells.forEach(m => expect(m.favourite.added).toBeNull());
    });

    it('should show favourite marks when logged in', async () => {
      await loginHelper.login();
      await framePage.navigateToFindSpellPage();

      const spells = await findSpellPage.getResults();

      spells.forEach(m => expect(m.favourite).not.toBeNull());
    });

    async function assertFavouriteOnFindPage(
      added: boolean,
    ): Promise<IFoundSpell> {
      const spells = await findSpellPage.getResults();
      expect(spells.length).toBeGreaterThan(0);
      const spell = spells[0];
      expect(spell.favourite.added).toEqual(added);
      return spell;
    }

    it('should add and remove favourite', async () => {
      await loginHelper.login();
      await framePage.navigateToFindSpellPage();

      let spell = await assertFavouriteOnFindPage(false);
      await spell.favourite.click();
      await assertFavouriteOnFindPage(true);

      await framePage.navigateToFavourites();
      await favouritesPage.assertIsOnThePage();

      let isSpellInFavourites = await favouritesPage.isSpellPresent(spell.name);
      expect(isSpellInFavourites).toBeTruthy();

      await framePage.navigateToFindSpellPage();
      spell = await assertFavouriteOnFindPage(true);
      await spell.favourite.click();
      spell = await assertFavouriteOnFindPage(false);

      await framePage.navigateToFavourites();
      isSpellInFavourites = await favouritesPage.isSpellPresent(spell.name);
      expect(isSpellInFavourites).toBeFalsy();
    });
  });

  describe('find feat', () => {
    let findFeatPage: FindFeatPage;

    beforeEach(() => {
      findFeatPage = new FindFeatPage();
    });

    beforeEach(async () => {
      await findFeatPage.navigateTo();
      await findFeatPage.clearSearchCriteria();
    });

    it('should not show favourite marks when not logged in', async () => {
      await loginHelper.logout();

      const feats = await findFeatPage.getResults();

      feats.forEach(m => expect(m.favourite.added).toBeNull());
    });

    it('should show favourite marks when logged in', async () => {
      await loginHelper.login();
      await framePage.navigateToFindFeatPage();

      const feats = await findFeatPage.getResults();

      feats.forEach(m => expect(m.favourite).not.toBeNull());
    });

    async function assertFavouriteOnFindPage(
      added: boolean,
    ): Promise<IFoundFeat> {
      const feats = await findFeatPage.getResults();
      expect(feats.length).toBeGreaterThan(0);
      const feat = feats[0];
      expect(feat.favourite.added).toEqual(added);
      return feat;
    }

    it('should add and remove favourite', async () => {
      await loginHelper.login();
      await framePage.navigateToFindFeatPage();

      let feat = await assertFavouriteOnFindPage(false);
      await feat.favourite.click();
      await assertFavouriteOnFindPage(true);

      await framePage.navigateToFavourites();
      await favouritesPage.assertIsOnThePage();

      let isFeatInFavourites = await favouritesPage.isFeatPresent(feat.name);
      expect(isFeatInFavourites).toBeTruthy();

      await framePage.navigateToFindFeatPage();
      feat = await assertFavouriteOnFindPage(true);
      await feat.favourite.click();
      feat = await assertFavouriteOnFindPage(false);

      await framePage.navigateToFavourites();
      isFeatInFavourites = await favouritesPage.isFeatPresent(feat.name);
      expect(isFeatInFavourites).toBeFalsy();
    });
  });
});
