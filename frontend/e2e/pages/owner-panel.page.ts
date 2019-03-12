import {
  browser,
  element,
  by,
  ElementArrayFinder,
  ElementFinder,
} from 'protractor';

export class OwnerPanelPage {
  private pageUrl = '/dashboard/owner-panel';

  private tabs = {
    monsters: element(by.css('ul li #owned-monsters')),
    spells: element(by.css('ul li #owned-spells')),
    feats: element(by.css('ul li #owned-feats')),
  };

  private ownerTables = {
    monsters: element.all(by.css('table#owned-monsters-table tbody tr')),
    spells: element.all(by.css('table#owned-spells-table tbody tr')),
    feats: element.all(by.css('table#owned-feats-table tbody tr')),
  };

  private nameSearch = {
    monsters: element(by.css('input#name-control')),
    spells: element(by.css('input#name-control')),
    feats: element(by.css('input#name-control')),
  };

  private panels = {
    lastUpdated: element.all(
      by.css('#last-updated-entities table tbody tr td:nth-child(1) span'),
    ),
    recentActivity: element.all(
      by.css('#recent-activity-entities table tbody tr td:nth-child(1) span'),
    ),
  };

  private nameSelector = 'td:nth-child(1)';
  private actionButtonSelector = by.css('button.dropdown-toggle');
  private deleteButton = by.css('ul.dropdown-menu li a.delete-item');

  private modalConfirmButton = element(
    by.css('d20md-confirm-delete-modal button.btn-danger'),
  );

  async assertIsOnThePage() {
    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toContain(this.pageUrl);
  }

  async isMonsterPresent(name: string): Promise<boolean> {
    await this.tabs.monsters.click();
    await this.nameSearch.monsters.clear();
    await this.nameSearch.monsters.sendKeys(name);
    const names = await this.getNames(this.ownerTables.monsters);
    return names.includes(name);
  }

  async isSpellPresent(name: string): Promise<boolean> {
    await this.tabs.spells.click();
    await this.nameSearch.spells.clear();
    await this.nameSearch.spells.sendKeys(name);
    const names = await this.getNames(this.ownerTables.spells);
    return names.includes(name);
  }

  async isFeatPresent(name: string): Promise<boolean> {
    await this.tabs.feats.click();
    await this.nameSearch.feats.clear();
    await this.nameSearch.feats.sendKeys(name);
    const names = await this.getNames(this.ownerTables.feats);
    return names.includes(name);
  }

  async deleteMonster(name: string): Promise<void> {
    await this.deleteEntity(
      name,
      this.nameSearch.monsters,
      this.ownerTables.monsters,
    );
  }

  async deleteSpell(name: string): Promise<void> {
    await this.deleteEntity(
      name,
      this.nameSearch.spells,
      this.ownerTables.spells,
    );
  }

  async deleteFeat(name: string): Promise<void> {
    await this.deleteEntity(
      name,
      this.nameSearch.feats,
      this.ownerTables.feats,
    );
  }

  async getLastUpdatedNames(): Promise<string[]> {
    const names = await this.panels.lastUpdated.map(el => el.getText());
    return names as string[];
  }

  async getRecentActivityNames(): Promise<string[]> {
    const names = await this.panels.recentActivity.map(el => el.getText());
    return names as string[];
  }

  private async getNames(table: ElementArrayFinder): Promise<string[]> {
    const result = await table.map(el => el.$(this.nameSelector).getText());

    return result as string[];
  }

  private async deleteEntity(
    name: string,
    searchInput: ElementFinder,
    table: ElementArrayFinder,
  ): Promise<void> {
    await searchInput.clear();
    await searchInput.sendKeys(name);

    const rowToDelete = table.first();
    if (!rowToDelete) {
      throw Error('Cannot find monster to delete: ' + name);
    }

    const actionButton = rowToDelete.element(this.actionButtonSelector);
    await actionButton.click();

    const deleteButton = rowToDelete.element(this.deleteButton);
    await deleteButton.click();

    await this.modalConfirmButton.click();
  }
}
