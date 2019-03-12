import {IndexPage} from '../pages/index.page';

describe('Index', () => {
  let indexPage: IndexPage;

  beforeEach(async () => {
    indexPage = new IndexPage();
  });

  it('should display', async () => {
    await indexPage.navigateTo();

    const featureItems = await indexPage.getFeatureItems();
    expect(featureItems.length).toEqual(6);

    const shortcutButtons = await indexPage.getShortcutButtons();
    expect(shortcutButtons.addMonster.enabled).toBeFalsy();
    expect(shortcutButtons.searchMonster.enabled).toBeTruthy();
  });
});
