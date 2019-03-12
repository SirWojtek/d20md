import {v4 as uuid} from 'uuid';

import {AddMonsterPage} from '../pages/add-monster.page';
import {OwnerPanelPage} from '../pages/owner-panel.page';
import {FramePage} from '../pages/frame.page';
import {ICredentials, LoginPage} from '../pages/login.page';
import {userCredentials} from '../config/user-credentials';
import {IndexPage} from '../pages/index.page';
import {AddSpellPage} from '../pages/add-spell.page';
import {AddFeatPage} from '../pages/add-feat.page';

describe('owner panel', () => {
  let indexPage: IndexPage;
  let ownerPanelPage: OwnerPanelPage;
  let framePage: FramePage;
  let loginPage: LoginPage;
  let addMonsterPage: AddMonsterPage;
  let addSpellPage: AddSpellPage;
  let addFeatPage: AddFeatPage;

  let user: ICredentials;

  let monsterName: string;
  let spellName: string;
  let featName: string;

  beforeAll(() => {
    monsterName = 'test-monster-' + uuid();
    spellName = 'test-spell-' + uuid();
    featName = 'test-feat-' + uuid();
  });

  beforeEach(() => {
    indexPage = new IndexPage();
    ownerPanelPage = new OwnerPanelPage();
    framePage = new FramePage();
    loginPage = new LoginPage();
    addMonsterPage = new AddMonsterPage();
    addSpellPage = new AddSpellPage();
    addFeatPage = new AddFeatPage();

    user = userCredentials;
  });

  beforeEach(async () => {
    await indexPage.navigateTo();

    const isLoggedIn = await framePage.isLoggedIn();
    if (!isLoggedIn) {
      await framePage.clickLoginButton();
      await loginPage.login(user);
    }

    await framePage.navigateToOwnerPanel();
    await ownerPanelPage.assertIsOnThePage();
  });

  afterAll(async () => {
    const isLoggedIn = await framePage.isLoggedIn();
    if (isLoggedIn) {
      await framePage.logout();
    }
  });

  it('should show newly added monster in owner panel and delete it', async () => {
    let isTestMonsterPresent = await ownerPanelPage.isMonsterPresent(
      monsterName,
    );
    expect(isTestMonsterPresent).toBeFalsy();

    await framePage.navigateToAddMonsterPage();
    await addMonsterPage.assertAddPage();

    await addMonsterPage.create(monsterName);

    await framePage.navigateToOwnerPanel();
    await ownerPanelPage.assertIsOnThePage();

    isTestMonsterPresent = await ownerPanelPage.isMonsterPresent(monsterName);
    expect(isTestMonsterPresent).toBeTruthy();

    const lastUpdatedNames = await ownerPanelPage.getLastUpdatedNames();
    expect(lastUpdatedNames.length).toBeGreaterThan(0);
    expect(lastUpdatedNames[0]).toEqual(monsterName);

    const recentActivityNames = await ownerPanelPage.getRecentActivityNames();
    expect(recentActivityNames.length).toBeGreaterThan(0);
    expect(recentActivityNames[0]).toEqual(monsterName);

    await ownerPanelPage.deleteMonster(monsterName);

    isTestMonsterPresent = await ownerPanelPage.isMonsterPresent(monsterName);
    expect(isTestMonsterPresent).toBeFalsy();
  });

  it('should show newly added spell in owner panel and delete it', async () => {
    let isTestSpellPresent = await ownerPanelPage.isSpellPresent(spellName);
    expect(isTestSpellPresent).toBeFalsy();

    await framePage.navigateToAddSpellPage();
    await addSpellPage.assertAddPage();

    await addSpellPage.create(spellName);

    await framePage.navigateToOwnerPanel();
    await ownerPanelPage.assertIsOnThePage();

    isTestSpellPresent = await ownerPanelPage.isSpellPresent(spellName);
    expect(isTestSpellPresent).toBeTruthy();

    const lastUpdatedNames = await ownerPanelPage.getLastUpdatedNames();
    expect(lastUpdatedNames.length).toBeGreaterThan(0);
    expect(lastUpdatedNames[0]).toEqual(spellName);

    const recentActivityNames = await ownerPanelPage.getRecentActivityNames();
    expect(recentActivityNames.length).toBeGreaterThan(0);
    expect(recentActivityNames[0]).toEqual(spellName);

    await ownerPanelPage.deleteSpell(spellName);

    isTestSpellPresent = await ownerPanelPage.isSpellPresent(spellName);
    expect(isTestSpellPresent).toBeFalsy();
  });

  it('should show newly added feat in owner panel and delete it', async () => {
    let isTestFeatPresent = await ownerPanelPage.isFeatPresent(featName);
    expect(isTestFeatPresent).toBeFalsy();

    await framePage.navigateToAddFeatPage();
    await addFeatPage.assertAddPage();

    await addFeatPage.create(featName);

    await framePage.navigateToOwnerPanel();
    await ownerPanelPage.assertIsOnThePage();

    isTestFeatPresent = await ownerPanelPage.isFeatPresent(featName);
    expect(isTestFeatPresent).toBeTruthy();

    const lastUpdatedNames = await ownerPanelPage.getLastUpdatedNames();
    expect(lastUpdatedNames.length).toBeGreaterThan(0);
    expect(lastUpdatedNames[0]).toEqual(featName);

    const recentActivityNames = await ownerPanelPage.getRecentActivityNames();
    expect(recentActivityNames.length).toBeGreaterThan(0);
    expect(recentActivityNames[0]).toEqual(featName);

    await ownerPanelPage.deleteFeat(featName);

    isTestFeatPresent = await ownerPanelPage.isFeatPresent(featName);
    expect(isTestFeatPresent).toBeFalsy();
  });
});
