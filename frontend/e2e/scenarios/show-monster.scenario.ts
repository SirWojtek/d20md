import {FindMonsterPage} from '../pages/find-monster.page';
import {monster} from '../test-data/monster';
import {ShowMonsterPage} from '../pages/show-monster.page';
import {FramePage} from '../pages/frame.page';

describe('show monster', () => {
  let findMonsterPage: FindMonsterPage;
  let showMonsterPage: ShowMonsterPage;
  let framePage: FramePage;

  beforeEach(() => {
    findMonsterPage = new FindMonsterPage();
    showMonsterPage = new ShowMonsterPage();
    framePage = new FramePage();
  });

  beforeEach(async () => {
    await findMonsterPage.navigateTo();
    await findMonsterPage.clearSearchCriteria();
  });

  it('should navigate to the correct show monster page', async () => {
    await findMonsterPage.setSearchCriteria({name: monster.name});
    const foundMonsters = await findMonsterPage.getResults();

    expect(foundMonsters.length).toBeGreaterThan(0);
    expect(foundMonsters[0].name).toEqual(monster.name);

    await foundMonsters[0].click();

    const breadcrumbsItems = await framePage.getBreadcrumbs();
    expect(breadcrumbsItems).toEqual([
      'd20md',
      'Monsters',
      'Show',
      monster.name,
    ]);

    const monsterInfo = await showMonsterPage.getMonsterInfo();

    expect(monsterInfo).toEqual(monster);
  });
});
