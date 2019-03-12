import {browser} from 'protractor';
import {ISpellInfo} from '../interfaces/spell/ISpellInfo';
import {frameElements} from './elements/spell/frame.elements';
import {descriptionElements} from './elements/spell/description.elements';
import {detailsElements} from './elements/spell/details.elements';
import {ILevel} from '../interfaces/spell/ILevel';

export class ShowSpellPage {
  private pagePrefixUrl = '/spells/show';

  async getSpellInfo(): Promise<ISpellInfo> {
    await this.assertShowSpellPage();

    const [name, description] = await Promise.all([
      this.getName(),
      this.getDescription(),
    ]);

    const [saveType, spellResistable, levels, type, range] = await Promise.all([
      this.getSaveType(),
      this.getSpellResistable(),
      this.getLevels(),
      this.getType(),
      this.getRange(),
    ]);

    return {
      name,
      type,
      range,
      saveType,
      spellResistable,
      levels,
      description,
    };
  }

  private async getName(): Promise<string> {
    return frameElements.name.getText();
  }

  private async getDescription(): Promise<string> {
    return descriptionElements.text.getText();
  }

  private async getSaveType(): Promise<string> {
    return detailsElements.saves.saveType.getAttribute('title');
  }

  private async getSpellResistable(): Promise<boolean> {
    const classes = await detailsElements.saves.spellResistable.getAttribute(
      'class',
    );
    return classes.includes('fa-check');
  }

  private async getLevels(): Promise<ILevel[]> {
    const res = await detailsElements.spellLevels.list.map(el => ({
      className: el.$(detailsElements.spellLevels.classNameSelector).getText(),
      level: el.$(detailsElements.spellLevels.levelSelector).getText(),
    }));

    return res.map(l => ({
      className: l.className,
      level: Number(l.level),
    }));
  }

  private async getType(): Promise<string> {
    return detailsElements.details.type.getText();
  }

  private async getRange(): Promise<string> {
    return detailsElements.details.range.getAttribute('title');
  }

  private async assertShowSpellPage() {
    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toContain(this.pagePrefixUrl);
  }
}
