import {ISpellInfo} from '../interfaces/spell/ISpellInfo';

export const spell: ISpellInfo = {
  name: 'Dispel Magic',
  type: 'Abjuration',
  range: 'Medium',
  saveType: 'none',
  spellResistable: false,
  levels: [
    {className: 'Bard', level: 3},
    {className: 'Cleric', level: 3},
    {className: 'Druid', level: 4},
    {className: 'Magic', level: 3},
    {className: 'Paladin', level: 3},
    {className: 'Sorcerer/wizard', level: 3},
  ],
  // tslint:disable:max-line-length
  description: `
  You can use dispel magic to end ongoing spells that have been cast on a creature or object, to temporarily suppress the magical abilities of a magic item, to end ongoing spells (or at least their effects) within an area, or to counter another spellcaster's spell. A dispelled spell ends as if its duration had expired. Some spells, as detailed in their descriptions, can't be defeated by dispel magic. dispel magic can dispel (but not counter) spell-like effects just as it does spells.
  `,
  // tslint:enable:max-line-length
};
