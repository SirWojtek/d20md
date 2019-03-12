import {FindSpellPage} from '../pages/find-spell.page';
import {spell} from '../test-data/spell';
import {ShowSpellPage} from '../pages/show-spell.page';
import {assertSpellEquals} from '../helpers/asserts';
import {FramePage} from '../pages/frame.page';

describe('show spell', () => {
  let findSpellPage: FindSpellPage;
  let showSpellPage: ShowSpellPage;
  let framePage: FramePage;

  beforeEach(() => {
    findSpellPage = new FindSpellPage();
    showSpellPage = new ShowSpellPage();
    framePage = new FramePage();
  });

  beforeEach(async () => {
    await findSpellPage.navigateTo();
    await findSpellPage.clearSearchCriteria();
  });

  it('should navigate to the correct show spell page', async () => {
    await findSpellPage.setSearchCriteria({name: spell.name});
    const foundSpells = await findSpellPage.getResults();

    expect(foundSpells.length).toBeGreaterThan(0);
    expect(foundSpells[0].name).toEqual(spell.name);

    await foundSpells[0].click();

    const breadcrumbsItems = await framePage.getBreadcrumbs();
    expect(breadcrumbsItems).toEqual(['d20md', 'Spells', 'Show', spell.name]);

    const spellInfo = await showSpellPage.getSpellInfo();

    assertSpellEquals(spellInfo, spell);
  });
});
