import {v4 as uuid} from 'uuid';

import {IndexPage} from '../pages/index.page';
import {FramePage} from '../pages/frame.page';
import {LoginPage} from '../pages/login.page';
import {AddMonsterPage} from '../pages/add-monster.page';
import {ShowMonsterPage} from '../pages/show-monster.page';
import {defaultMonster} from '../test-data/default-monster';
import {LoginHelper} from '../helpers/login-helper';
import {IAttributes} from '../interfaces/monster/IAttributes';

describe('edit monster', () => {
  let indexPage: IndexPage;
  let framePage: FramePage;
  let loginPage: LoginPage;
  let addMonsterPage: AddMonsterPage;
  let showMonsterPage: ShowMonsterPage;
  let loginHelper: LoginHelper;

  let monsterName: string;

  beforeEach(() => {
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

    await framePage.navigateToAddMonsterPage();
    await addMonsterPage.assertAddPage();

    await addMonsterPage.create(monsterName);
  });

  afterEach(async () => {
    await showMonsterPage.deleteMonster();
  });

  afterAll(async () => {
    await loginHelper.logout();
  });

  it('should edit attributes', async () => {
    let monster = await showMonsterPage.getMonsterInfo();
    expect(monster).toEqual({...defaultMonster, name: monsterName});

    const newAttributes: Partial<IAttributes> = {
      strength: {
        value: 15,
        modifier: 2,
      },
      wisdom: {
        value: 16,
        modifier: 3,
      },
    };
    await showMonsterPage.setAttributes(newAttributes);

    monster = await showMonsterPage.getMonsterInfo();
    expect(monster).toEqual({
      ...defaultMonster,
      name: monsterName,
      attributes: {
        ...defaultMonster.attributes,
        ...newAttributes,
      },
    });
  });
});
