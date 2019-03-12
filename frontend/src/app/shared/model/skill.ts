import * as _ from 'lodash';
import { JsonSerializable } from './conversions';
import { keyAttributes } from './keyAttributes';

export class Skill implements JsonSerializable {
  excludedParams = [
    'total', 'abilitiesMod',
  ];

  total: {[key: string]: number; } = {};
  abilitiesMod: {[key: string]: number; } = {
    'strength' : 0,
    'dexterity' : 0,
    'constitution' : 0,
    'wisdom' : 0,
    'intelligence' : 0,
    'charisma' : 0,
  };

  afterConstructionFromJson() {}

  constructor(
    public _appraise: number = 0,
    public _balance: number = 0,
    public _bluff: number = 0,
    public _climb: number = 0,
    public _concentration: number = 0,
    public _craft_alchemy: number = 0,
    public _craft_armor: number = 0,
    public _craft_bow: number = 0,
    public _craft_weapon: number = 0,
    public _craft_trap: number = 0,
    public _craft_varies: number = 0,
    public _decipher_script: number = 0,
    public _diplomacy: number = 0,
    public _disable_device: number = 0,
    public _disguise: number = 0,
    public _escape_artist: number = 0,
    public _forgery: number = 0,
    public _gather_information: number = 0,
    public _handle_animal: number = 0,
    public _heal: number = 0,
    public _hide: number = 0,
    public _intimidate: number = 0,
    public _jump: number = 0,
    public _knowledge_arcana: number = 0,
    public _knowledge_architecture: number = 0,
    public _knowledge_dungeon: number = 0,
    public _knowledge_geography: number = 0,
    public _knowledge_history: number = 0,
    public _knowledge_local: number = 0,
    public _knowledge_nature: number = 0,
    public _knowledge_nobility: number = 0,
    public _knowledge_religion: number = 0,
    public _knowledge_planes: number = 0,
    public _listen: number = 0,
    public _move_silently: number = 0,
    public _open_lock: number = 0,
    public _perform: number = 0,
    public _profession: number = 0,
    public _ride: number = 0,
    public _search: number = 0,
    public _sense_motive: number = 0,
    public _sleight_of_hand: number = 0,
    public _spellcraft: number = 0,
    public _spot: number = 0,
    public _survival: number = 0,
    public _swim: number = 0,
    public _tumble: number = 0,
    public _use_magic_device: number = 0,
    public _use_rope: number = 0,
  ) {
    this.fillTotal();
    this.update();
  }

  public getParams(): string[] {
    const result = [];
    for (const key in this) {
      if (!key.startsWith('_')) { continue; }
      result.push(key.replace('_', ''));
    }
    return result;
  }

  public updateModifiers(
    strengthModifier: number,
    dexterityModifier: number,
    constitutionModifier: number,
    wisdomModifier: number,
    intelligenceModifier: number,
    charismaModifier: number
  ) {
    this.abilitiesMod['strength'] = strengthModifier;
    this.abilitiesMod['dexterity'] = dexterityModifier;
    this.abilitiesMod['constitution'] = constitutionModifier;
    this.abilitiesMod['wisdom'] = wisdomModifier;
    this.abilitiesMod['intelligence'] = intelligenceModifier;
    this.abilitiesMod['charisma'] = charismaModifier;

    this.update();
  }

  private fillTotal() {
    for (const key of this.getParams()) {
      if (keyAttributes[key] === undefined) { continue; }
      this.total[key] = 0;
    }
  }

  public update() {
    Object.keys(this.total).forEach(key =>
      this.total[key] = this[key] + this.abilitiesMod[keyAttributes[key]]
    );
  }

  public getKeysWithNames(): any[] {
    return this.getParams().map(param => {
      return { key: param, name: this.toReadableName(param) };
    });
  }

  public toReadableName(key: string) {
    return _.capitalize(_.startCase(key));
  }

  get appraise(): number { return this._appraise; }
  set appraise(newVal: number) {
    this._appraise = newVal;
    this.update();
  }
  get balance(): number { return this._balance; }
  set balance(newVal: number) {
    this._balance = newVal;
    this.update();
  }
  get bluff(): number { return this._bluff; }
  set bluff(newVal: number) {
    this._bluff = newVal;
    this.update();
  }
  get climb(): number { return this._climb; }
  set climb(newVal: number) {
    this._climb = newVal;
    this.update();
  }
  get concentration(): number { return this._concentration; }
  set concentration(newVal: number) {
    this._concentration = newVal;
    this.update();
  }
  get craft_alchemy(): number { return this._craft_alchemy; }
  set craft_alchemy(newVal: number) {
    this._craft_alchemy = newVal;
    this.update();
  }
  get craft_armor(): number { return this._craft_armor; }
  set craft_armor(newVal: number) {
    this._craft_armor = newVal;
    this.update();
  }
  get craft_bow(): number { return this._craft_bow; }
  set craft_bow(newVal: number) {
    this._craft_bow = newVal;
    this.update();
  }
  get craft_weapon(): number { return this._craft_weapon; }
  set craft_weapon(newVal: number) {
    this._craft_weapon = newVal;
    this.update();
  }
  get craft_trap(): number { return this._craft_trap; }
  set craft_trap(newVal: number) {
    this._craft_trap = newVal;
    this.update();
  }
  get craft_varies(): number { return this._craft_varies; }
  set craft_varies(newVal: number) {
    this._craft_varies = newVal;
    this.update();
  }
  get decipher_script(): number { return this._decipher_script; }
  set decipher_script(newVal: number) {
    this._decipher_script = newVal;
    this.update();
  }
  get diplomacy(): number { return this._diplomacy; }
  set diplomacy(newVal: number) {
    this._diplomacy = newVal;
    this.update();
  }
  get disable_device(): number { return this._disable_device; }
  set disable_device(newVal: number) {
    this._disable_device = newVal;
    this.update();
  }
  get disguise(): number { return this._disguise; }
  set disguise(newVal: number) {
    this._disguise = newVal;
    this.update();
  }
  get escape_artist(): number { return this._escape_artist; }
  set escape_artist(newVal: number) {
    this._escape_artist = newVal;
    this.update();
  }
  get forgery(): number { return this._forgery; }
  set forgery(newVal: number) {
    this._forgery = newVal;
    this.update();
  }
  get gather_information(): number { return this._gather_information; }
  set gather_information(newVal: number) {
    this._gather_information = newVal;
    this.update();
  }
  get handle_animal(): number { return this._handle_animal; }
  set handle_animal(newVal: number) {
    this._handle_animal = newVal;
    this.update();
  }
  get heal(): number { return this._heal; }
  set heal(newVal: number) {
    this._heal = newVal;
    this.update();
  }
  get hide(): number { return this._hide; }
  set hide(newVal: number) {
    this._hide = newVal;
    this.update();
  }
  get intimidate(): number { return this._intimidate; }
  set intimidate(newVal: number) {
    this._intimidate = newVal;
    this.update();
  }
  get jump(): number { return this._jump; }
  set jump(newVal: number) {
    this._jump = newVal;
    this.update();
  }
  get knowledge_arcana(): number { return this._knowledge_arcana; }
  set knowledge_arcana(newVal: number) {
    this._knowledge_arcana = newVal;
    this.update();
  }
  get knowledge_architecture(): number { return this._knowledge_architecture; }
  set knowledge_architecture(newVal: number) {
    this._knowledge_architecture = newVal;
    this.update();
  }
  get knowledge_dungeon(): number { return this._knowledge_dungeon; }
  set knowledge_dungeon(newVal: number) {
    this._knowledge_dungeon = newVal;
    this.update();
  }
  get knowledge_geography(): number { return this._knowledge_geography; }
  set knowledge_geography(newVal: number) {
    this._knowledge_geography = newVal;
    this.update();
  }
  get knowledge_history(): number { return this._knowledge_history; }
  set knowledge_history(newVal: number) {
    this._knowledge_history = newVal;
    this.update();
  }
  get knowledge_local(): number { return this._knowledge_local; }
  set knowledge_local(newVal: number) {
    this._knowledge_local = newVal;
    this.update();
  }
  get knowledge_nature(): number { return this._knowledge_nature; }
  set knowledge_nature(newVal: number) {
    this._knowledge_nature = newVal;
    this.update();
  }
  get knowledge_nobility(): number { return this._knowledge_nobility; }
  set knowledge_nobility(newVal: number) {
    this._knowledge_nobility = newVal;
    this.update();
  }
  get knowledge_religion(): number { return this._knowledge_religion; }
  set knowledge_religion(newVal: number) {
    this._knowledge_religion = newVal;
    this.update();
  }
  get knowledge_planes(): number { return this._knowledge_planes; }
  set knowledge_planes(newVal: number) {
    this._knowledge_planes = newVal;
    this.update();
  }
  get listen(): number { return this._listen; }
  set listen(newVal: number) {
    this._listen = newVal;
    this.update();
  }
  get move_silently(): number { return this._move_silently; }
  set move_silently(newVal: number) {
    this._move_silently = newVal;
    this.update();
  }
  get open_lock(): number { return this._open_lock; }
  set open_lock(newVal: number) {
    this._open_lock = newVal;
    this.update();
  }
  get perform(): number { return this._perform; }
  set perform(newVal: number) {
    this._perform = newVal;
    this.update();
  }
  get profession(): number { return this._profession; }
  set profession(newVal: number) {
    this._profession = newVal;
    this.update();
  }
  get ride(): number { return this._ride; }
  set ride(newVal: number) {
    this._ride = newVal;
    this.update();
  }
  get search(): number { return this._search; }
  set search(newVal: number) {
    this._search = newVal;
    this.update();
  }
  get sense_motive(): number { return this._sense_motive; }
  set sense_motive(newVal: number) {
    this._sense_motive = newVal;
    this.update();
  }
  get sleight_of_hand(): number { return this._sleight_of_hand; }
  set sleight_of_hand(newVal: number) {
    this._sleight_of_hand = newVal;
    this.update();
  }
  get spellcraft(): number { return this._spellcraft; }
  set spellcraft(newVal: number) {
    this._spellcraft = newVal;
    this.update();
  }
  get spot(): number { return this._spot; }
  set spot(newVal: number) {
    this._spot = newVal;
    this.update();
  }
  get survival(): number { return this._survival; }
  set survival(newVal: number) {
    this._survival = newVal;
    this.update();
  }
  get swim(): number { return this._swim; }
  set swim(newVal: number) {
    this._swim = newVal;
    this.update();
  }
  get tumble(): number { return this._tumble; }
  set tumble(newVal: number) {
    this._tumble = newVal;
    this.update();
  }
  get use_magic_device(): number { return this._use_magic_device; }
  set use_magic_device(newVal: number) {
    this._use_magic_device = newVal;
    this.update();
  }
  get use_rope(): number { return this._use_rope; }
  set use_rope(newVal: number) {
    this._use_rope = newVal;
    this.update();
  }
}

