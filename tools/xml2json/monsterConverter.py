#!/usr/bin/env python2

import json
from lxml import etree
import re
import sys
from commonSpecials import commonSpecials
from AttackParser import AttackParser
from featTemplates import featTemplates
from findDuplicates import findDuplicates

if (len(sys.argv) < 3):
  raise Exception('Pass input xml and output json directories as arguments')

filename = sys.argv[1] + '/monster.xml'
output = sys.argv[2] + '/monster.json'

hdRegex = re.compile(r'(\d+/*\d*)\s*d(\d+)\s*(\+\d+,*\d*)?')
hpRegex = re.compile(r'(\d+,*\d*)\s+hp')
landSpeedRegex = re.compile(r'^(\d+) ft\.')
flySpeedRegex = re.compile(r'[Ff]ly (\d+) ft\.')
burrowSpeedRegex = re.compile(r'[Bb]urrow (\d+) ft\.')
climbSpeedRegex = re.compile(r'[Cc]limb (\d+) ft\.')
swimSpeedRegex = re.compile(r'[Ss]wim (\d+) ft\.')
armorRegex = re.compile(r'\((.+?)\)')
singleArmorRegex = re.compile(r'([+-]\d+)\s+(.+)')
skillRegex = re.compile(r'\**(, )*(.+?)\s+([+-]\d+)')
specialRegex = re.compile(r'(.+?) \((\w+)\)(, )*')

armorPatterns = {
  'insight': [ 'insight' ],
  'profane': [ 'profane' ],
  'enhancement': [ 'enhancement' ],
  'natural': [ 'natural', 'amulet' ],
  'size': [ 'size' ],
  'deflection': [ 'deflection', 'protection', 'ring' ],
  'shield': [ 'shield', 'buckler' ],
  'armor': [
    'chain', 'shirt', 'armor', 'plate', 'hide',
    'mail', 'leather', 'bracers'
  ],
}

savePatterns = {
  'Fort': 'fortitude',
  'Ref': 'reflex',
  'Will': 'will',
}

abilityPatterns = {
  'Str': 'strength',
  'Dex': 'dexterity',
  'Con': 'constitution',
  'Int': 'intelligence',
  'Wis': 'wisdom',
  'Cha': 'charisma',
}

skillPatterns = {
  'knowledge': [
    'arcana', 'architecture', 'dungeon', 'geography', 'history',
    'local', 'nature', 'nobility', 'religion', 'planes',
  ],
  'craft': [ 'alchemy', 'armor', 'bow', 'weapon', 'trap', 'varies' ],
}

specialTypePatterns = {
  'Ex': 'extraordinary',
  'Sp': 'spell-like',
  'Su': 'supernatural'
}

environmentSet = {
  'forest', 'marsh', 'hill', 'mountain', 'desert', 'plains', 'aquatic',
  'underground', 'dungeon', 'warm', 'temperate', 'plane', 'chaotic', 'evil',
  'any', 'fire', 'water', 'earth', 'plane', 'elemental', 'land', 'cold', 'warm',
  'ethereal', 'good', 'chaos', 'lawful', 'shadow', 'neutral', 'air', 'positive',
  'energy', 'urban', 'limbo'
}

typePatterns = [
  'aberration', 'animal', 'construct', 'dragon', 'elemental', 'fey', 'giant', 'humanoid',
  'monstrous humanoid', 'magical beast', 'ooze', 'outsider',
  'plant', 'undead', 'vermin'
]

sizePatters = [
    'fine', 'diminutive', 'tiny', 'small',
    'medium', 'large', 'huge', 'gargantuan', 'colossal'
]

def _convertToInt(string):
  try:
    return int(string)
  except ValueError:
    num, denum = string.split('/')
    return int(num) / int(denum)

def _getHitDices(diceItem):
  result = []

  for match in hdRegex.findall(diceItem.text):
    result.append({ 'hd_amount': _convertToInt(match[0]), 'hd_type': int(match[1])})

  if len(result) == 0:
    raise Exception(diceItem.text)

  return result

def getDiceInfo(diceItem):
  hpMatch = hpRegex.search(diceItem.text)

  if not hpMatch:
    raise Exception(diceItem.text)

  return _getHitDices(diceItem), _convertToInt(hpMatch.group(1).replace(',', ''))

def getType(item):
  text = item.text.lower()
  if text not in typePatterns:
    raise Exception('Unknown type: ' + text)
  return text

def getSize(item):
  text = item.text.lower().replace('+', '')
  if text not in sizePatters:
    raise Exception('Unknown size: ' + text)
  return text

def _convertEnvironment(envList):
  for i, dirtyEnv in enumerate(envList):
    for cleanEnv in environmentSet:
      if cleanEnv in dirtyEnv:
        envList[i] = cleanEnv

def getEnvironment(item):
  toRemove = [ 'a', ',', 'an', 'and', 'or', 'of' ]
  textList = [ x for x in item.text.lower().split(' ') if x not in toRemove ]
  _convertEnvironment(textList)
  textSet = set(textList)

  if not textSet <= environmentSet:
    raise Exception(textSet)

  return map(lambda x: { 'type': x }, textSet)

def getChallengeRating(item):
  try:
    return int(item.text)
  except ValueError:
    return 1

def getInitiative(initItem):
  return int(initItem.text.split(' ')[0])

def getSpeed(speedItem):
  landMatch = landSpeedRegex.search(speedItem.text)
  flyMatch = flySpeedRegex.search(speedItem.text)
  burrowMatch = burrowSpeedRegex.search(speedItem.text)
  climbMatch = climbSpeedRegex.search(speedItem.text)
  swimMatch = swimSpeedRegex.search(speedItem.text)

  return { 'land': int(landMatch.group(1)) if landMatch else 0,
      'fly': int(flyMatch.group(1)) if flyMatch else 0,
      'burrow': int(burrowMatch.group(1)) if burrowMatch else 0,
      'climb': int(climbMatch.group(1)) if climbMatch else 0,
      'swim': int(swimMatch.group(1)) if swimMatch else 0
    }

def getSingleArmorInfo(singleArmorText):
  singleArmorMatch = singleArmorRegex.match(singleArmorText)
  if not singleArmorMatch:
    raise Exception(armorItem.text, armor)

  armorText = singleArmorMatch.group(2)
  armorValue = singleArmorMatch.group(1)

  for key, values in armorPatterns.items():
    for value in values:
      if value in armorText:
        return key, int(armorValue)
  return None, None

def getArmor(armorItem):
  armorMatch = armorRegex.search(armorItem.text)
  if not armorMatch:
    raise Exception(armorItem.text)

  result = {}

  for armor in armorMatch.group(1).split(', '):
    key, value = getSingleArmorInfo(armor)
    if key and value:
      result[key] = value

  return result

def getSave(saveItem):
  result = {}
  for save in saveItem.text.split(', '):
    saveInfo = save.split(' ')
    if len(saveInfo) < 2:
      raise Exception(saveInfo)
    elif saveInfo[1] == '-':
      saveInfo[1] = '0'
    result[savePatterns[saveInfo[0]]] = int(saveInfo[1].replace('*', ''))
  return result

def getAttribute(abilityItem):
  result = {}
  for ability in abilityItem.text.split(', '):
    abilityInfo = ability.split(' ')
    if len(abilityInfo) < 2:
      raise Exception(abilityInfo)
    elif abilityInfo[1] == '-':
      abilityInfo[1] = '0'
    result[abilityPatterns[abilityInfo[0]]] = int(abilityInfo[1].replace('*', ''))
  return result

def _getDifficultSkillName(rawName):
  rawNameLower = rawName.lower()
  result = []
  for skillName, skillTypes in skillPatterns.items():
    if skillName in rawNameLower:
      for skillType in skillTypes:
        if skillType in rawNameLower:
          result.append(('%s_%s' % (skillName, skillType)))
  return result

def _getSkillName(rawName):
  if '(' in rawName:
    return _getDifficultSkillName(rawName)
  return [ rawName.lower().replace(' ', '_') ]

def getSkill(skillItem):
  if skillItem is None or skillItem.text is None:
    return {}
  result = {}
  for skills in skillRegex.findall(skillItem.text):
    for skillName in _getSkillName(skills[1]):
      result[skillName] = int(skills[2])
  return result

def getFeats(items):
  result = { 'feats': [], 'templates': [] }
  for featItem in items:
    if featItem is not None and featItem.text is not None:
      for feat in featItem.text.split(', '):
        if filter(lambda x: x['name'] in feat, featTemplates):
          result['templates'].append(feat)
        else:
          result['feats'].append(feat)
  return result

class FullTextFinder:
  def __init__(self, fullTextItem):
    self._html = etree.HTML(etree.tostring(fullTextItem))

  def findDescriptionForSpecial(self, specialName):
    result = ''
    for div in self._html.xpath('//div[@topic="%s"]' % specialName):
      for child in div.getchildren():
        result += re.sub(r'<b>.*%s.+?</b>' % specialName, '', etree.tostring(child))
    return result if result else commonSpecials.get(specialName, '')

  def findSpells(self):
    result = set()
    spellPaths = [
      self._html.xpath('//div[@topic="Spell-Like Abilities"]//i'),
      self._html.xpath('//div[@topic="Spells"]//i'),
    ]
    for element in spellPaths:
      for rawSpell in element:
        result.add(rawSpell.text.lower())
    return list(result)

def getSpells(fullTextItem):
  finder = FullTextFinder(fullNameItem)
  return finder.findSpells()

def getSpecials(item, descriptionItem, monsterName):
  if item is None or item.text is None:
    return []
  result = []
  finder = FullTextFinder(descriptionItem)

  for specialName, specialType, _ in specialRegex.findall(item.text):
    description = finder.findDescriptionForSpecial(specialName)
    if not description:
      print(specialName, monsterName)
    result.append({
      'name': specialName,
      'type': specialTypePatterns[specialType],
      'description': description,
    })

  return result

#clear output file
open(output, 'w').close()

root = None

#read xml file
with file(filename) as f:
  xmlContent = f.read()
  root = etree.XML(xmlContent)

jsonContent = [];

for item in root.findall('monster'):
  data ={}
  fullNameItem = item.find('full_text')

  data["name"] = item.find('name').text
  data['type'] = getType(item.find('type'))
  data['size'] = getSize(item.find('size'))
  data['EnvironmentTags'] = getEnvironment(item.find('environment'))
  data['challenge_rating'] = getChallengeRating(item.find('challenge_rating'))
  treasureItem = item.find('treasure')
  if treasureItem is not None:
    data['treasure'] = treasureItem.text.lower()
  else:
    data['treasure'] = 'none'
  data['HitDices'], data['hp'] = getDiceInfo(item.find('hit_dice'))
  data['initiative'] = getInitiative(item.find('initiative'))
  data['Speed'] = getSpeed(item.find('speed'))
  data['Armor'] = getArmor(item.find('armor_class'))
  data['Save'] = getSave(item.find('saves'))
  data['Attribute'] = getAttribute(item.find('abilities'))
  data['Skill'] = getSkill(item.find('skills'))
  data['Feats'] = getFeats([item.find('feats'), item.find('epic_feats')])
  data['Spells'] = getSpells(fullNameItem)
  data['Specials'] = getSpecials(item.find('special_abilities'), fullNameItem, data['name'])
  data['AttackGroups'] = AttackParser(
    item.find('attack'),
    item.find('full_attack'),
    data['Attribute']['strength']
  ).parse()

  #append row to json
  jsonContent.append(data.copy())

findDuplicates(jsonContent)

#dump all to file
with open(output, 'a') as outputFile:
  json.dump(jsonContent, outputFile, indent = 2)
  print('Converted %d monsters' % len(jsonContent))

