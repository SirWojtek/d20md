import {FramePage} from '../pages/frame.page';
import {ShowMonsterPage} from '../pages/show-monster.page';
import {monster} from '../test-data/monster';
import {IndexPage} from '../pages/index.page';
import {ShowSpellPage} from '../pages/show-spell.page';
import {ShowFeatPage} from '../pages/show-feat.page';
import {spell} from '../test-data/spell';
import {feat} from '../test-data/feat';
import {assertSpellEquals, assertFeatEquals} from '../helpers/asserts';

describe('QuickSearch', () => {
  let framePage: FramePage;
  let indexPage: IndexPage;
  let showMonsterPage: ShowMonsterPage;
  let showSpellPage: ShowSpellPage;
  let showFeatPage: ShowFeatPage;

  beforeEach(async () => {
    indexPage = new IndexPage();
    framePage = new FramePage();
    showMonsterPage = new ShowMonsterPage();
    showSpellPage = new ShowSpellPage();
    showFeatPage = new ShowFeatPage();

    await indexPage.navigateTo();
  });

  it('should find monster then spell then feat', async () => {
    const monsterSearchResults = await framePage.quickSearch(monster.name);
    expect(monsterSearchResults.length).toBeGreaterThanOrEqual(1);

    const monsterBestMatch = monsterSearchResults[0];
    expect(monsterBestMatch.name).toEqual(monster.name);
    expect(monsterBestMatch.type).toEqual('Monster');
    await monsterBestMatch.click();

    const monsterInfo = await showMonsterPage.getMonsterInfo();
    expect(monsterInfo).toEqual(monster);

    const spellSearchResults = await framePage.quickSearch(spell.name);
    expect(spellSearchResults.length).toBeGreaterThanOrEqual(1);

    const spellBestMatch = spellSearchResults[0];
    expect(spellBestMatch.name).toEqual(spell.name);
    expect(spellBestMatch.type).toEqual('Spell');
    await spellBestMatch.click();

    const spellInfo = await showSpellPage.getSpellInfo();
    assertSpellEquals(spellInfo, spell);

    const featSearchResults = await framePage.quickSearch(feat.name);
    expect(featSearchResults.length).toBeGreaterThanOrEqual(1);

    const featBestMatch = featSearchResults[0];
    expect(featBestMatch.name).toEqual(feat.name);
    expect(featBestMatch.type).toEqual('Feat');
    await featBestMatch.click();

    const featInfo = await showFeatPage.getFeatInfo();
    assertFeatEquals(featInfo, feat);
  });
});
