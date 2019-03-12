import { Component, Input } from '@angular/core';
import { AttackGroup } from '../../../shared/model/attack-group';
import { Attack } from '../../../shared/model/attack';
import { Damage } from '../../../shared/model/damage';
import { Utils } from '../../../shared/utils';
import { chromaColor } from '../../../shared/chroma-color';

@Component({
  selector : 'd20md-show-attacks',
  templateUrl: './show-attacks.component.html',
  styleUrls: [ './show-attacks.component.scss' ]
})

export class ShowAttacksComponent {
  @Input() attackGroups: AttackGroup[];

  utils = Utils;

  private attackColor = chromaColor([-20, 0, 15, 30, 70]);

  public attackTypeToColor = {
    'bludgeoning': 'burlywood',
    'slashing': 'silver',
    'piercing': 'olive',
    'acid': 'limegreen',
    'cold': 'aqua',
    'electricity': 'yellow',
    'fire': 'crimson',
    'sonic': 'royalblue',
    'force': 'hotpink',
    'negative': 'mediumpurple',
    'positive': 'gold',
    '': 'white'
  };

  public getColor(attack: Attack) {
    return this.attackColor(attack.total.attack_bonus);
  }

  public getRowClasses(attackGroup: AttackGroup, attack: Attack) {
    const classes = [];

    const index = this.attackGroups.indexOf(attackGroup);
    if (index === -1) { return classes; }

    if (index % 2) {
      classes.push('active');
    }

    return classes;
  }

  public showOrRow(attackGroup: AttackGroup, attack: Attack) {
    const index = attackGroup.Attacks.indexOf(attack);
    const attackGroupLen = attackGroup.Attacks.length;
    if (index === -1) { return false; }
    return attackGroupLen > 1 && index !== attackGroupLen - 1;
  }

  public getAttackBonusInfo(attack: Attack) {
    return attack.attack_bonus + ' + ' + attack.getAttackBonus() + ' (' + attack.getAttackAttribute() + ')';
  }

  public getDamageText(dmg: Damage) {
    return dmg.dd_amount + 'k' + dmg.dd_type + ' + ' + dmg.total.damage_bonus + '/' + dmg.critical;
  }

  public getDamageInfo(dmg: Damage) {
    return dmg.damage_bonus + ' + ' + dmg.getDamageBonus() + ' (Str) ' + dmg.description;
  }
}
