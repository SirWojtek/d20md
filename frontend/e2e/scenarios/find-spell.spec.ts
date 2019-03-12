import {FindSpellPage, ISearchCriterias} from '../pages/find-spell.page';
import {FramePage} from '../pages/frame.page';

describe('find spell', () => {
  const testSpell = {
    name: 'dispel magic',
    type: 'abjuration',
    range: 'medium',
    class: 'paladin',
  };

  let findSpellPage: FindSpellPage;
  let framePage: FramePage;

  beforeEach(() => {
    findSpellPage = new FindSpellPage();
    framePage = new FramePage();
  });

  beforeEach(async () => {
    await findSpellPage.navigateTo();
    await findSpellPage.clearSearchCriteria();
  });

  async function assertSpellFind(
    criteria: ISearchCriterias,
    expectedResults,
    name,
  ) {
    await findSpellPage.setSearchCriteria(criteria);

    const foundSpells = await findSpellPage.getResults();
    expect(foundSpells.length).toEqual(expectedResults);

    const matchedSpell = foundSpells.find(m => m.name.toLowerCase() === name);
    expect(matchedSpell).toBeDefined();
  }

  it('should have breadcrumbs', async () => {
    const breadcrumbsItems = await framePage.getBreadcrumbs();
    expect(breadcrumbsItems).toEqual(['d20md', 'Spells', 'Find']);
  });

  it('should not find not existing spell', async () => {
    await findSpellPage.setSearchCriteria({
      name: 'not existing spell',
    });

    const foundSpells = await findSpellPage.getResults();
    expect(foundSpells.length).toEqual(0);
  });

  it('should find spell by name', async () => {
    const criteria = {
      name: testSpell.name,
    };
    await assertSpellFind(criteria, 2, testSpell.name);
  });

  it('should find spell by name and type', async () => {
    const criteria = {
      name: testSpell.name,
      type: testSpell.type,
    };
    await assertSpellFind(criteria, 2, testSpell.name);
  });

  it('should find spell by name, type and range', async () => {
    const criteria = {
      name: testSpell.name,
      type: testSpell.type,
      range: testSpell.range,
    };
    await assertSpellFind(criteria, 2, testSpell.name);
  });

  it('should find spell by name, type, range and class', async () => {
    const criteria = {
      name: testSpell.name,
      type: testSpell.type,
      range: testSpell.range,
      class: testSpell.class,
    };
    await assertSpellFind(criteria, 1, testSpell.name);
  });
});
