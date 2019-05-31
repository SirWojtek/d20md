import {browser, promise, ElementFinder, ElementArrayFinder} from 'protractor';
import {IMonsterInfo} from '../interfaces/monster/IMonsterInfo';
import {ISaves} from '../interfaces/monster/ISaves';
import {IHitDice} from '../interfaces/monster/IHitDice';
import {IAttributes} from '../interfaces/monster/IAttributes';
import {IArmor} from '../interfaces/monster/IArmor';
import {IMovement} from '../interfaces/monster/IMovement';
import {ISkills} from '../interfaces/monster/ISkills';
import {IFeat} from '../interfaces/monster/IFeat';
import {ISpecial} from '../interfaces/monster/ISpecial';
import {frameElements} from './elements/monster/frame.elements';
import {attributesElements} from './elements/monster/attributes.elements';
import {armorElements} from './elements/monster/armor.elements';
import {movementElements} from './elements/monster/movement.elements';
import {skillsElements} from './elements/monster/skills.elements';
import {featElements} from './elements/monster/feat.elements';
import {specialElements} from './elements/monster/special.elements';
import {accordionSelectors} from './elements/monster/accordion.selectors';
import {
  FavouriteElements,
  IFavouritesInfo,
} from './elements/favourites/favourites.elements';

export class ShowMonsterPage {
  private pagePrefixUrl = '/monsters/show/';

  private favouriteElements = new FavouriteElements();

  async getMonsterInfo(): Promise<IMonsterInfo> {
    await this.assertShowMonsterPage();

    const [
      name,
      saves,
      hitDices,
      hp,
      initiative,
      type,
      attributes,
    ] = await Promise.all([
      this.getName(),
      this.getSaves(),
      this.getHitDices(),
      this.getHp(),
      this.getInitiative(),
      this.getType(),
      this.getAttributes(),
    ]);

    const armor = await this.getArmor();
    const movement = await this.getMovement();
    const skills = await this.getSkills();
    const feats = await this.getFeats();
    const specials = await this.getSpecials();

    return {
      name,
      saves,
      hitDices,
      hp,
      type,
      initiative,
      attributes,
      armor,
      movement,
      skills,
      feats,
      specials,
    };
  }

  async getFavouritesInfo(): Promise<IFavouritesInfo> {
    return this.favouriteElements.getFavouriteItems(frameElements.base);
  }

  async deleteMonster(): Promise<void> {
    await frameElements.deleteButton.click();
  }

  async setAttributes(attr: Partial<IAttributes>) {
    await attributesElements.tab.click();
    await attributesElements.editButton.click();

    if (attr.strength) {
      await this.setAttributesSlider(
        attributesElements.editModal.strengthSlider,
        attr.strength.value,
      );
    }
    if (attr.dexterity) {
      await this.setAttributesSlider(
        attributesElements.editModal.dexteritySlider,
        attr.dexterity.value,
      );
    }
    if (attr.constitution) {
      await this.setAttributesSlider(
        attributesElements.editModal.constitutionSlider,
        attr.constitution.value,
      );
    }
    if (attr.intelligence) {
      await this.setAttributesSlider(
        attributesElements.editModal.intelligenceSlider,
        attr.intelligence.value,
      );
    }
    if (attr.wisdom) {
      await this.setAttributesSlider(
        attributesElements.editModal.wisdomSlider,
        attr.wisdom.value,
      );
    }
    if (attr.charisma) {
      await this.setAttributesSlider(
        attributesElements.editModal.charismaSlider,
        attr.charisma.value,
      );
    }

    await attributesElements.editModal.saveButton.click();
  }

  private async getName(): Promise<string> {
    const name = await frameElements.name.getText();
    return name;
  }

  private async getSaves(): Promise<ISaves> {
    const [fTotal, fBase, rTotal, rBase, wTotal, wBase] = await promise.all([
      frameElements.saves.fortitude.total.getText(),
      frameElements.saves.fortitude.base.getText(),
      frameElements.saves.reflex.total.getText(),
      frameElements.saves.reflex.base.getText(),
      frameElements.saves.will.total.getText(),
      frameElements.saves.will.base.getText(),
    ]);

    return {
      will: {
        total: Number(wTotal),
        base: Number(wBase),
      },
      reflex: {
        total: Number(rTotal),
        base: Number(rBase),
      },
      fortitude: {
        total: Number(fTotal),
        base: Number(fBase),
      },
    };
  }

  private async getHitDices(): Promise<IHitDice[]> {
    const dicesText = (await frameElements.hitDices.dices.map(el =>
      el.getText(),
    )) as string[];

    return dicesText.map(dt => {
      const splitted = dt.split('k');
      if (splitted.length !== 2) {
        throw Error('Invalid hit dice text format');
      }
      return {multiplier: Number(splitted[0]), diceType: Number(splitted[1])};
    });
  }

  private async getHp(): Promise<number> {
    const hp = await frameElements.hitDices.hp.getText();
    return Number(hp);
  }

  private async getInitiative(): Promise<number> {
    const initiative = await frameElements.initiative.getText();
    return Number(initiative);
  }

  private async getType(): Promise<string> {
    const type = await frameElements.type.getAttribute('title');
    return type;
  }

  private async getAttributes(): Promise<IAttributes> {
    await attributesElements.tab.click();
    const [
      sv,
      sm,
      dv,
      dm,
      cv,
      cm,
      wv,
      wm,
      iv,
      im,
      chv,
      chm,
    ] = await promise.all([
      attributesElements.strength.value.getText(),
      attributesElements.strength.modifier.getText(),
      attributesElements.dexterity.value.getText(),
      attributesElements.dexterity.modifier.getText(),
      attributesElements.constitution.value.getText(),
      attributesElements.constitution.modifier.getText(),
      attributesElements.wisdom.value.getText(),
      attributesElements.wisdom.modifier.getText(),
      attributesElements.intelligence.value.getText(),
      attributesElements.intelligence.modifier.getText(),
      attributesElements.charisma.value.getText(),
      attributesElements.charisma.modifier.getText(),
    ]);

    return {
      strength: {
        value: Number(sv),
        modifier: Number(sm),
      },
      dexterity: {
        value: Number(dv),
        modifier: Number(dm),
      },
      constitution: {
        value: Number(cv),
        modifier: Number(cm),
      },
      wisdom: {
        value: Number(wv),
        modifier: Number(wm),
      },
      intelligence: {
        value: Number(iv),
        modifier: Number(im),
      },
      charisma: {
        value: Number(chv),
        modifier: Number(chm),
      },
    };
  }

  private async getArmor(): Promise<IArmor> {
    await armorElements.tab.click();
    const [
      base,
      armor,
      shield,
      dexterity,
      size,
      enhancement,
      deflection,
      natural,
      touch,
      flatFooted,
      total,
    ] = await promise.all([
      armorElements.types.base.getText(),
      armorElements.types.armor.getText(),
      armorElements.types.shield.getText(),
      armorElements.types.dexterity.getText(),
      armorElements.types.size.getText(),
      armorElements.types.enhancement.getText(),
      armorElements.types.deflection.getText(),
      armorElements.types.natural.getText(),
      armorElements.summary.touch.getText(),
      armorElements.summary.flatFooted.getText(),
      armorElements.summary.total.getText(),
    ]);

    return {
      base: Number(base),
      armor: Number(armor),
      shield: Number(shield),
      dexterity: Number(dexterity),
      size: Number(size),
      enhancement: Number(enhancement),
      deflection: Number(deflection),
      natural: Number(natural),
      touch: Number(touch),
      flatFooted: Number(flatFooted),
      total: Number(total),
    };
  }

  private async getMovement(): Promise<IMovement> {
    await movementElements.tab.click();

    const [fly, swim, climb, land, burrow] = await promise.all([
      movementElements.values.fly.getText(),
      movementElements.values.swim.getText(),
      movementElements.values.climb.getText(),
      movementElements.values.land.getText(),
      movementElements.values.burrow.getText(),
    ]);

    return {
      fly: this.extractMovementSpeed(fly),
      swim: this.extractMovementSpeed(swim),
      climb: this.extractMovementSpeed(climb),
      land: this.extractMovementSpeed(land),
      burrow: this.extractMovementSpeed(burrow),
    };
  }

  private async getSkills(): Promise<ISkills> {
    await skillsElements.tab.click();
    await skillsElements.showNotLearnedSkills.click();

    const [
      hideM,
      hideT,
      listenM,
      listenT,
      moveSilentlyM,
      moveSilentlyT,
      spotM,
      spotT,
      survivalM,
      survivalT,
    ] = await promise.all([
      skillsElements.skill.hide.modifier.getText(),
      skillsElements.skill.hide.total.getText(),
      skillsElements.skill.listen.modifier.getText(),
      skillsElements.skill.listen.total.getText(),
      skillsElements.skill.moveSilently.modifier.getText(),
      skillsElements.skill.moveSilently.total.getText(),
      skillsElements.skill.spot.modifier.getText(),
      skillsElements.skill.spot.total.getText(),
      skillsElements.skill.survival.modifier.getText(),
      skillsElements.skill.survival.total.getText(),
    ]);

    return {
      hide: {
        modifier: Number(hideM),
        total: Number(hideT),
      },
      listen: {
        modifier: Number(listenM),
        total: Number(listenT),
      },
      moveSilently: {
        modifier: Number(moveSilentlyM),
        total: Number(moveSilentlyT),
      },
      spot: {
        modifier: Number(spotM),
        total: Number(spotT),
      },
      survival: {
        modifier: Number(survivalM),
        total: Number(survivalT),
      },
    };
  }

  private async getFeats(): Promise<IFeat[]> {
    await featElements.tab.click();

    const feats = await this.getAccordionItems(featElements.featList);

    return feats.map(f => ({
      name: f.header,
      benefit: f.text,
    }));
  }

  private async getSpecials(): Promise<ISpecial[]> {
    await specialElements.tab.click();

    const specials = await this.getAccordionItems(specialElements.specialList);

    return specials.map(f => ({
      name: f.header,
      description: f.text,
    }));
  }

  private async getAccordionItems(
    accordionElement: ElementArrayFinder,
  ): Promise<{header: string; text: string}[]> {
    const data = (await accordionElement.map(e => {
      return promise.all([
        e.element(accordionSelectors.header).getText(),
        this.getAccordionText(e),
      ]);
    })) as string[][];
    return data.map(d => ({header: d[0], text: d[1]}));
  }

  private getAccordionText(e: ElementFinder): promise.Promise<string> {
    return e.click().then(() => e.element(accordionSelectors.text).getText());
  }

  private extractMovementSpeed(raw: string): number {
    const numberRegex = /\d+/;
    const results = numberRegex.exec(raw);

    if (results.length !== 1) {
      throw new Error('Incorrect format of movement speed');
    }

    return Number(results[0]);
  }

  private async assertShowMonsterPage() {
    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toContain(this.pagePrefixUrl);
  }

  private async setAttributesSlider(slider: ElementFinder, val: number) {
    // NOTE: padding: 18px
    const width = (await slider.getSize()).width - 18;
    const offset = (width / 50) * val;
    const x = Math.floor(offset - width / 2);

    await browser
      .actions()
      .dragAndDrop(slider, {x, y: 0})
      .perform();
  }
}
