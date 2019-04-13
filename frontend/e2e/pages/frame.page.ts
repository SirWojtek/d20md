import {element, by} from 'protractor';

export interface IQuickSearchResult {
  name: string;
  type: string;
  click: () => Promise<void>;
}

export class FramePage {
  private navbarElements = {
    findButton: element(by.css('d20md-navbar #navbar-find')),
    addButton: element(by.css('d20md-navbar #navbar-add')),
    dashboardButton: element(by.css('d20md-navbar #navbar-dashboard')),
    settingsButton: element(by.css('d20md-navbar #navbar-settings')),
    loginButton: element(by.css('d20md-navbar #login-button')),
    registerButton: element(by.css('d20md-navbar #register-button')),
    quickSearch: {
      input: element(by.css('d20md-navbar d20md-search-bar #search-bar-input')),
      results: element.all(by.css('d20md-navbar d20md-search-bar ul li')),
      nameSelector: 'div h5',
      typeSelector: 'div span',
    },
  };

  private dropdownElements = {
    find: {
      monster: element(by.css('d20md-navbar #find-monster')),
      spell: element(by.css('d20md-navbar #find-spell')),
      feat: element(by.css('d20md-navbar #find-feat')),
    },
    add: {
      monster: element(by.css('d20md-navbar #add-monster')),
      spell: element(by.css('d20md-navbar #add-spell')),
      feat: element(by.css('d20md-navbar #add-feat')),
    },
    dashbaord: {
      ownerPanel: element(by.css('d20md-navbar #owner-panel')),
      favourites: element(by.css('d20md-navbar #favourites')),
    },
    settings: {
      changePassword: element(by.css('d20md-navbar #change-password')),
      logout: element(by.css('d20md-navbar #logout')),
    },
  };

  private breadcrumbsElements = {
    items: element.all(by.css('d20md-breadcrumbs ol.breadcrumb li')),
  };

  async isLoggedIn(): Promise<boolean> {
    const result = !(await this.navbarElements.loginButton.isPresent());
    return result;
  }

  async logout(): Promise<void> {
    expect(await this.isLoggedIn()).toBeTruthy();

    await this.navbarElements.settingsButton.click();
    await this.dropdownElements.settings.logout.click();
  }

  async canCreate(): Promise<boolean> {
    const isAddButtonPresent = await this.navbarElements.addButton.isPresent();

    if (!isAddButtonPresent) {
      return false;
    }

    await this.navbarElements.addButton.click();
    const isAddMonsterPresent = await this.dropdownElements.add.monster.isPresent();
    const isAddSpellPresent = await this.dropdownElements.add.spell.isPresent();
    const isAddFeatPresent = await this.dropdownElements.add.feat.isPresent();

    if (
      isAddMonsterPresent !== isAddSpellPresent ||
      isAddMonsterPresent !== isAddFeatPresent ||
      isAddSpellPresent !== isAddFeatPresent
    ) {
      throw Error('Inconsistent state of navbar');
    }

    return isAddMonsterPresent && isAddFeatPresent && isAddSpellPresent;
  }

  async canEnterDashboard(): Promise<boolean> {
    return this.navbarElements.dashboardButton.isPresent();
  }

  async canEnterSettings(): Promise<boolean> {
    return this.navbarElements.settingsButton.isPresent();
  }

  async clickLoginButton(): Promise<void> {
    await this.navbarElements.loginButton.click();
  }

  async quickSearch(query: string): Promise<IQuickSearchResult[]> {
    await this.navbarElements.quickSearch.input.sendKeys(query);

    const result = (await this.navbarElements.quickSearch.results.map(el => ({
      name: el.$(this.navbarElements.quickSearch.nameSelector).getText(),
      type: el.$(this.navbarElements.quickSearch.typeSelector).getText(),
      click: el.click,
    }))) as IQuickSearchResult[];

    return result;
  }

  async getBreadcrumbs(): Promise<string[]> {
    const result = await this.breadcrumbsElements.items.map(el => el.getText());
    return result as string[];
  }

  async navigateToAddMonsterPage(): Promise<void> {
    await this.navbarElements.addButton.click();
    await this.dropdownElements.add.monster.click();
  }

  async navigateToAddSpellPage(): Promise<void> {
    await this.navbarElements.addButton.click();
    await this.dropdownElements.add.spell.click();
  }

  async navigateToAddFeatPage(): Promise<void> {
    await this.navbarElements.addButton.click();
    await this.dropdownElements.add.feat.click();
  }

  async navigateToFindMonsterPage(): Promise<void> {
    await this.navbarElements.findButton.click();
    await this.dropdownElements.find.monster.click();
  }

  async navigateToFindSpellPage(): Promise<void> {
    await this.navbarElements.findButton.click();
    await this.dropdownElements.find.spell.click();
  }

  async navigateToFindFeatPage(): Promise<void> {
    await this.navbarElements.findButton.click();
    await this.dropdownElements.find.feat.click();
  }

  async navigateToOwnerPanel(): Promise<void> {
    await this.navbarElements.dashboardButton.click();
    await this.dropdownElements.dashbaord.ownerPanel.click();
  }

  async navigateToFavourites(): Promise<void> {
    await this.navbarElements.dashboardButton.click();
    await this.dropdownElements.dashbaord.favourites.click();
  }

  async navigateToChangePasswordPage(): Promise<void> {
    await this.navbarElements.settingsButton.click();
    await this.dropdownElements.settings.changePassword.click();
  }
}
