import re

attackRegex = re.compile(r'^(\d\s+)*(.+)\s+((?:[\+-]\d+\/*)+)\s+(\(.+?(\(.+?\))*\))?(\s+.*range.*)*')
damageRegex = re.compile(r'(\d+)d(\d+)([+-]\d+)?(?:\s([\w\s]+))?(?:\/([\w-]+))?')

attackTypesPatterns = [ 'melee touch', 'ranged touch', 'melee', 'ranged' ]

damageTypesPatterns = [
  ( 'bludgeoning', [
    'bite', 'slap', 'slam', 'wing', 'tentacle', 'hammer', 'club',
    'staff', 'morningstar', 'hoove', 'rock', 'mace', 'tail', 'stamp',
    'butt', 'boulder', 'thrown', 'sling', 'tongue', 'tendril', 'arm',
    'strand', 'coil', 'hoof'
  ]),
  ( 'slashing', [
    'claw', 'bite', 'talon', 'rapier', 'sword', 'axe' ,'dagger',
    'glaive', 'scimitar', 'blade', 'falchion'
  ]),
  ( 'piercing', [
    'bow', 'claw', 'bite', 'talon', 'gore', 'rapier', 'sting',
    'horn', 'spear', 'javelin', 'dagger', 'lance', 'morningstar',
    'chain', 'spike', 'ram', 'trident', 'forelimb', 'pincer',
    'snake', 'pick', 'quill'
  ]),
  ( 'acid', []),
  ( 'cold', []),
  ( 'electricity', [
    'electricity', 'shocking'
  ]),
  ( 'fire', [
    'burning', 'flaming'
  ]),
  ( 'sonic', []),
  ( 'force', []),
  ( 'negative', [
    'incorporeal'
  ]),
  ( 'positive', []),
  ( 'other', [
    'swarm', 'disintegrating', 'light', 'antennae', 'touch',
    'ray', 'rope', 'spit'
  ])
]

irregularPlural = {
  'hoof': 'hoove',
}

class AttackParser:
  def __init__(self, attackItem, fullAttackItem, strength):
    self._fullAttackItem = fullAttackItem
    self._attackItem = attackItem
    self._fullAttack = []
    self._strengthModifier = (strength - 10) / 2

  def parse(self):
    self._getAllAttacks()
    self._markMainAttacks()
    return self._fullAttack

  def _getAllAttacks(self):
    if self._fullAttackItem.text is None:
      return
    for attackGroup in re.split(', | and ' , self._fullAttackItem.text):
      if ' or ' in attackGroup:
        self._fullAttack.append({ 'Attacks': self._parseGroupAttack(attackGroup, self._strengthModifier)})
      else:
        self._fullAttack.extend(self._parseRegularAttack(attackGroup, self._strengthModifier))

  @staticmethod
  def _parseGroupAttack(attackGroup, strengthModifier):
    result = []
    for attack in attackGroup.split(' or '):
      attack, attackType = AttackParser._extractAttackType(attack)
      attack, count = AttackParser._parseAttack(attack, attackType, strengthModifier)
      result.extend([attack] * count)
    return result

  @staticmethod
  def _parseRegularAttack(attackGroup, strengthModifier):
    attack, attackType = AttackParser._extractAttackType(attackGroup)
    attack, count = AttackParser._parseAttack(attack, attackType, strengthModifier)
    return [{'Attacks': [ attack ] }] * count

  @staticmethod
  def _parseAttack(attack, attackType, strengthModifier):
    for match in attackRegex.finditer(attack):
      for attackBonus in match.group(3).split('/'):
        count = int(match.group(1)) if match.group(1) else 1
        name = re.sub('s$', '', match.group(2)).capitalize()

        return {
          'name': name,
          'attack_bonus': int(attackBonus),
          'attack_type': attackType,
          'is_main': False,
          'Damages': AttackParser._extractDamageInfo(match.group(4), name, strengthModifier),
          'range': 0,
        }, count;
    raise Exception('Attack cannot be parsed: ' + attack)

  @staticmethod
  def _extractAttackType(attack):
    for attackType in attackTypesPatterns:
      if attackType in attack:
        return attack.replace(attackType, ''), attackType

    raise Exception('Attack type not found: ' + attack)

  @staticmethod
  def _extractDamageInfo(dmgInfo, attackName, strengthModifier):
    if dmgInfo is None:
      return []
    result = []
    dmgInfo = dmgInfo.replace('(', '').replace(')', '')
    for singleDmg in dmgInfo.split(' plus '):
      if damageRegex.search(singleDmg) is None:
        result.append({
          'dd_amount': 0,
          'dd_type': 0,
          'damage_bonus': 0,
          'damage_type': AttackParser._deduceDamageType(None, attackName),
          'description': singleDmg,
          'critical': 'x2',
        })
        continue
      for dmgMatch in damageRegex.finditer(singleDmg):
        result.append({
          'dd_amount': int(dmgMatch.group(1)),
          'dd_type': int(dmgMatch.group(2)),
          'damage_bonus': int(dmgMatch.group(3)) - strengthModifier if dmgMatch.group(3) else 0,
          'damage_type': AttackParser._deduceDamageType(dmgMatch.group(4), attackName),
          'description': dmgMatch.group(4) if dmgMatch.group(4) else '',
          'critical': dmgMatch.group(5) if dmgMatch.group(5) else 'x2',
        })
    return result

  @staticmethod
  def _deduceDamageType(dmgDescription, attackName):
    for damageType, _ in damageTypesPatterns:
      if dmgDescription and dmgDescription.lower() in damageType:
        return dmgDescription.lower()
    for dmgType, patterns in damageTypesPatterns:
      for pattern in patterns:
        if pattern in attackName.lower():
          return dmgType
    raise Exception('Could not find attack type for ' + attackName)

  def _markMainAttacks(self):
    if self._attackItem is None or self._attackItem.text is None:
      return
    for attackGroup in re.split(', | and ' , self._attackItem.text):
      for attack in attackGroup.split(' or '):
        attack, attackType = self._extractAttackType(attack)
        parsedAttack, _ = self._parseAttack(attack, attackType, self._strengthModifier)
        found = self._findAttackInFullAttacks(parsedAttack['name'])
        found['is_main'] = True;

  def _findAttackInFullAttacks(self, attackName):
    for attackGroup in self._fullAttack:
      for attack in attackGroup['Attacks']:
        plural = irregularPlural.get(attackName.lower())
        fullAttackName = attack['name'].lower()
        if (attackName.lower() in fullAttackName or (plural and plural in fullAttackName)):
          return attack
    raise Exception('Cannot find full attack matching main attack ' + attackName)
