import {FindFeatPage} from '../pages/find-feat.page';
import {feat} from '../test-data/feat';
import {ShowFeatPage} from '../pages/show-feat.page';
import {assertFeatEquals} from '../helpers/asserts';
import {FramePage} from '../pages/frame.page';

describe('show feat', () => {
  let findFeatPage: FindFeatPage;
  let showFeatPage: ShowFeatPage;
  let framePage: FramePage;

  beforeEach(() => {
    findFeatPage = new FindFeatPage();
    showFeatPage = new ShowFeatPage();
    framePage = new FramePage();
  });

  beforeEach(async () => {
    await findFeatPage.navigateTo();
    await findFeatPage.clearSearchCriteria();
  });

  it('should navigate to the correct show feat page', async () => {
    await findFeatPage.setSearchCriteria({phrase: feat.name, type: 'general'});
    const foundFeats = await findFeatPage.getResults();

    expect(foundFeats.length).toBeGreaterThan(0);
    expect(foundFeats[0].name).toEqual(feat.name);

    await foundFeats[0].click();

    const breadcrumbsItems = await framePage.getBreadcrumbs();
    expect(breadcrumbsItems).toEqual(['d20md', 'Feats', 'Show', feat.name]);

    const featInfo = await showFeatPage.getFeatInfo();

    assertFeatEquals(featInfo, feat);
  });
});
