import {Spell} from './spell';
import {HitDice} from './hit-dice';
import {SpecialAbility} from './special-ability';
import {Feat} from './feat';
import * as attribute from './attribute';
import * as skill from './skill';
import * as armor from './armor';
import * as attackGroup from './attack-group';
import * as save from './save';
import * as speed from './speed';
import * as environmentTag from './environment-tag';
import * as image from './image';
import * as user from './user';
import {JsonSerializable} from './conversions';

export class Monster implements JsonSerializable {
  public excludedParams = [];
  public afterConstructionFromJson() {
    this.Armor.updateModifiers(this.Attribute.mod.dexterity);
    this.Save.updateModifiers(
      this.Attribute.mod.wisdom,
      this.Attribute.mod.dexterity,
      this.Attribute.mod.constitution,
    );
    this.Skill.updateModifiers(
      this.Attribute.mod.strength,
      this.Attribute.mod.dexterity,
      this.Attribute.mod.constitution,
      this.Attribute.mod.wisdom,
      this.Attribute.mod.intelligence,
      this.Attribute.mod.charisma,
    );
    for (const group of this.AttackGroups) {
      for (const attack of group.Attacks) {
        attack.updateModifiers(
          this.Attribute.mod.strength,
          this.Attribute.mod.dexterity,
        );
      }
    }
  }

  constructor(
    public id: number = -1,
    public name: string = '',
    public type: string = 'humanoid',
    public size: string = 'medium',
    public hd_sum: number = 1,
    public armor_sum: number = 1,
    public attack_max: number = 0,
    public description: string = '',
    public HitDices: HitDice[] = [new HitDice()],
    public hp: number = 2,
    public initiative: number = 0,
    public challenge_rating: number = 1,
    public treasure: string = 'none',
    public views: number = 0,
    public Spells: Spell[] = [],
    public Specials: SpecialAbility[] = [],
    public Feats: Feat[] = [],
    public Attribute = new attribute.Attribute(),
    public Skill = new skill.Skill(),
    public Armor = new armor.Armor(),
    public AttackGroups: attackGroup.AttackGroup[] = [],
    public Save = new save.Save(),
    public Speed = new speed.Speed(),
    public EnvironmentTags: environmentTag.EnvironmentTag[] = [],
    public Image = new image.Image(),
    public User = new user.User(),
  ) {
    this.afterConstructionFromJson();
  }

  getImage(): string {
    if (this.Image && this.Image.path) {
      return this.Image.path;
    }
    return 'assets/img/monster-generic.svg';
  }
}
