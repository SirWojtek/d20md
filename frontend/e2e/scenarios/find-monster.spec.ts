import {FindMonsterPage} from '../pages/find-monster.page';
import {FramePage} from '../pages/frame.page';

describe('find monster', () => {
  const testMonster = {
    name: 'wolf',
    size: 'medium',
    type: 'animal',
  };

  let findMonsterPage: FindMonsterPage;
  let framePage: FramePage;

  beforeEach(() => {
    findMonsterPage = new FindMonsterPage();
    framePage = new FramePage();
  });

  beforeEach(async () => {
    await findMonsterPage.navigateTo();
    await findMonsterPage.clearSearchCriteria();
  });

  async function assertMonsterFind(criteria, expectedResults, name) {
    await findMonsterPage.setSearchCriteria(criteria);

    const foundMonsters = await findMonsterPage.getResults();
    expect(foundMonsters.length).toEqual(expectedResults);

    const matchedMonster = foundMonsters.find(
      m => m.name.toLowerCase() === name,
    );
    expect(matchedMonster).toBeDefined();
  }

  it('should have breadcrumbs', async () => {
    const breadcrumbsItems = await framePage.getBreadcrumbs();
    expect(breadcrumbsItems).toEqual(['d20md', 'Monsters', 'Find']);
  });

  it('should not find not existing monster', async () => {
    await findMonsterPage.setSearchCriteria({
      name: 'not existing monster',
    });

    const foundMonsters = await findMonsterPage.getResults();
    expect(foundMonsters.length).toEqual(0);
  });

  it('should find monster by name', async () => {
    const criteria = {
      name: testMonster.name,
    };
    await assertMonsterFind(criteria, 6, testMonster.name);
  });

  it('should find monster by name and size', async () => {
    const criteria = {
      name: testMonster.name,
      size: testMonster.size,
    };
    await assertMonsterFind(criteria, 6, testMonster.name);
  });

  it('should find monster by name, size and type', async () => {
    const criteria = {
      name: testMonster.name,
      size: testMonster.size,
      type: testMonster.type,
    };
    await assertMonsterFind(criteria, 1, testMonster.name);
  });
});
