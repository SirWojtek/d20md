import {FindFeatPage, ISearchCriterias} from '../pages/find-feat.page';
import {FramePage} from '../pages/frame.page';

describe('find feat', () => {
  const testFeat = {
    phrase: 'power',
    type: 'general',
  };

  let findFeatPage: FindFeatPage;
  let framePage: FramePage;

  beforeEach(() => {
    findFeatPage = new FindFeatPage();
    framePage = new FramePage();
  });

  beforeEach(async () => {
    await findFeatPage.navigateTo();
    await findFeatPage.clearSearchCriteria();
  });

  async function assertFeatFind(
    criteria: ISearchCriterias,
    expectedResultsCount: number,
  ) {
    await findFeatPage.setSearchCriteria(criteria);

    const foundFeats = await findFeatPage.getResults();
    expect(foundFeats.length).toEqual(expectedResultsCount);

    const matchedFeat = foundFeats.find(
      m =>
        m.name.toLowerCase().includes(criteria.phrase) &&
        (!criteria.type || m.type === criteria.type),
    );
    expect(matchedFeat).toBeDefined();
  }

  it('should have breadcrumbs', async () => {
    const breadcrumbsItems = await framePage.getBreadcrumbs();
    expect(breadcrumbsItems).toEqual(['d20md', 'Feats', 'Find']);
  });

  it('should not find not existing feat', async () => {
    await findFeatPage.setSearchCriteria({
      phrase: 'not existing feat',
    });

    const foundFeats = await findFeatPage.getResults();
    expect(foundFeats.length).toEqual(0);
  });

  it('should find feat by name', async () => {
    const criteria = {
      phrase: testFeat.phrase,
    };
    await assertFeatFind(criteria, 4);
  });

  it('should find feat by phrase and type', async () => {
    const criteria = {
      phrase: testFeat.phrase,
      type: testFeat.type,
    };
    await assertFeatFind(criteria, 4, testFeat.phrase);
  });
});
