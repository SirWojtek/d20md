import {v4 as uuid} from 'uuid';

import {IndexPage} from '../pages/index.page';
import {FramePage} from '../pages/frame.page';
import {LoginPage, ICredentials} from '../pages/login.page';
import {AddMonsterPage} from '../pages/add-monster.page';
import {ShowMonsterPage} from '../pages/show-monster.page';
import {defaultMonster} from '../test-data/default-monster';
import {IMonsterInfo} from '../interfaces/monster/IMonsterInfo';
import {LoginHelper} from '../helpers/login-helper';

describe('add monster', () => {
  let indexPage: IndexPage;
  let framePage: FramePage;
  let loginPage: LoginPage;
  let addMonsterPage: AddMonsterPage;
  let showMonsterPage: ShowMonsterPage;
  let loginHelper: LoginHelper;

  let monsterName: string;

  beforeAll(() => {
    monsterName = 'test-monster-' + uuid();
  });

  beforeEach(() => {
    indexPage = new IndexPage();
    framePage = new FramePage();
    loginPage = new LoginPage();
    addMonsterPage = new AddMonsterPage();
    showMonsterPage = new ShowMonsterPage();
    loginHelper = new LoginHelper(framePage, loginPage);
  });

  beforeEach(async () => {
    await indexPage.navigateTo();
    await loginHelper.login();
  });

  afterAll(async () => {
    await loginHelper.logout();
  });

  it('should create monster', async () => {
    await framePage.navigateToAddMonsterPage();
    await addMonsterPage.assertAddPage();

    await addMonsterPage.create(monsterName);

    const monster = await showMonsterPage.getMonsterInfo();
    expect(monster).toEqual({...defaultMonster, name: monsterName});

    await showMonsterPage.deleteMonster();
  });

  it('should create monster with type', async () => {
    await framePage.navigateToAddMonsterPage();
    await addMonsterPage.assertAddPage();

    await addMonsterPage.create(monsterName, 'Construct', 10);

    const monster = await showMonsterPage.getMonsterInfo();
    const expected: IMonsterInfo = {
      ...defaultMonster,
      name: monsterName,
      saves: {
        will: {
          total: 3,
          base: 3,
        },
        reflex: {
          total: 3,
          base: 3,
        },
        fortitude: {
          total: -2,
          base: 3,
        },
      },
      hitDices: [{multiplier: 10, diceType: 10}],
      hp: 60,
      type: 'Construct',
      attributes: {
        ...defaultMonster.attributes,
        constitution: {
          value: 0,
          modifier: -5,
        },
      },
    };
    expect(monster).toEqual(expected);

    await showMonsterPage.deleteMonster();
  });
});
