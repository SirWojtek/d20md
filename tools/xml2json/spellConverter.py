#!/usr/bin/env python2

import json
from lxml import etree
import sys
import re
from findDuplicates import findDuplicates

if (len(sys.argv) < 3):
  raise Exception('Pass input xml and output json directories as arguments')

filename = sys.argv[1] + '/spell.xml'
output = sys.argv[2] + '/spell.json'

descriptionTags = re.compile(r'(<description>\n\s+)|(</description>\n\s+)')

def stringifyChildren(node):
  nodeText = etree.tostring(node)
  return descriptionTags.sub('', nodeText)

def getSpellRange(rangeText):
  for spellRange in [ 'none', 'personal', 'touch', 'close', 'medium', 'long', 'unlimited' ]:
    index = rangeText.lower().find(spellRange)
    if index != -1:
      return index + len(spellRange), spellRange

  return -1, None

def getRange(item):
  if item.find('range') is None:
    return 'custom', ''

  rangeText = item.find('range').text
  index, spellRange = getSpellRange(rangeText)

  if index != -1:
    return spellRange, rangeText[index + 1:].replace('(', '').replace(')', '')
  return 'custom', rangeText

componentsMap = {
  'V' : 'verbal',
  'S' : 'somatic',
  'M' : 'material',
  'XP' : 'xp',
  'F' : 'focus',
  'DF' : 'divine focus',
  'M/DF' : 'material/divine focus',
  'F/DF' : 'focus/divine focus',
  'Ritual' : 'ritual',
}

def convertComponent(rawComponent):
  return { 'value' : componentsMap[rawComponent] }

def getComponents(item):
  return map(convertComponent, item.text.split(', '))

saveTypes = [ 'will', 'reflex', 'fortitude', 'none', 'custom' ]

def getSaveType(item):
  if item.find('saving_throw') == None:
    return 'none'

  rawSaveType = item.find('saving_throw').text.lower()
  for saveType in saveTypes:
    if saveType in rawSaveType:
      return saveType
  return 'custom'

typePattern = re.compile(r'^\w+')

def getType(item):
  return typePattern.search(item.find('school').text.lower()).group(0)

#clear output file
open(output, 'w').close()

root = None

#read xml file
with file(filename) as f:
    xmlContent = f.read()
    root = etree.XML(xmlContent)

jsonContent=[];

for i, item in enumerate(root.findall('spell')):
  data ={}
  data["name"]=""
  data["description"]=""
  data["SpellLevels"] = []
  data["SpellComponents"] = []
  data["save_type"] =""
  data["permits_sr"] = False
  data["spell_range"] = ""
  data["spell_type"] = ""

  data["name"] = item.find('name').text
  data['description'] = stringifyChildren(item.find('description'))

  if item.find('level') != None:
    levelTxt = item.find('level').text.split(', ')
    for record in levelTxt:
      splitted = record.split(' ')
      data["SpellLevels"].append({
          "class_name": splitted[0].lower(),
          "level": splitted[1]
      });

  if item.find('components') != None:
    data['SpellComponents'] = getComponents(item.find('components'))

  data["save_type"] = getSaveType(item)

  if item.find('spell_resistance') != None:
    if item.find('spell_resistance').text == "Yes":
      data["permits_sr"] = True
    else:
      data["permits_sr"] = False

  data["spell_range"], data["range_info"] = getRange(item)

  if item.find('school') != None:
    data["spell_type"] = getType(item)

  #append row to json
  jsonContent.append(data.copy())

findDuplicates(jsonContent)

#dump all to file
with open(output, 'a') as outputFile:
    json.dump(jsonContent, outputFile, indent = 2)
    print('Converted %d spells' % len(jsonContent))

