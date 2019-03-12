#!/usr/bin/env python2

import xml.etree.ElementTree as ET
import json
from lxml import etree
import re
import sys
from featTemplates import featTemplates
from findDuplicates import findDuplicates

if (len(sys.argv) < 3):
  raise Exception('Pass input xml and output json directories as arguments')

filename = sys.argv[1] + '/feat.xml'
output = sys.argv[2] + '/feat.json'

benefitTag = re.compile(r'(<benefit>.+</b> )|(</div>\s*</benefit>)')

def stringifyChildren(node):
  nodeText = etree.tostring(node)
  return benefitTag.sub('', nodeText)

def _getPrerequisiteName(rawName):
  for templateData in featTemplates:
    if templateData['name'] in rawName:
      return templateData['name']
  return rawName

def getPrerequisites(prerequisites):
  result = []
  for prereq in prerequisites.text.replace('.', '').split(', '):
    result.append(_getPrerequisiteName(prereq))
  return result

def getFeatType(item):
  rawType = item.find('type').text.lower()
  return rawType.split(',')[0]


#clear output file
open(output, 'w').close()

root = None

#read xml file
with file(filename) as f:
  xmlContent = f.read()
  root = etree.XML(xmlContent)

jsonContent = {
  'featTemplates': [],
  'feats': [],
}

def writeToJson(data):
  for templateData in featTemplates:
    if templateData['name'] in data['name']:
      data.update(templateData)
      jsonContent['featTemplates'].append(data)
      return
  jsonContent['feats'].append(data)

for item in root.findall('feat'):
  data = {}
  data["name"]=""
  data["feat_type"]=""
  data["benefit"]=""
  data["normal"]=""
  data["special"]=""
  data["prerequisite"]=""
  data["name"] = item.find('name').text
  data["feat_type"] = getFeatType(item)

  data["benefit"] = stringifyChildren(item.find('benefit'))

  if item.find('normal') != None:
    data["normal"] = item.find('normal').text
  if item.find('special') != None:
    data["special"] = item.find('special').text
  if item.find('prerequisite') != None:
    data["prerequisite"] = getPrerequisites(item.find('prerequisite'))
  else:
    data["prerequisite"] = []

  writeToJson(data.copy())

findDuplicates(jsonContent['feats'])
findDuplicates(jsonContent['featTemplates'])

#dump all to file
with open(output, 'a') as outputFile:
  json.dump(jsonContent, outputFile, indent = 2)
  print('Converted %d feats' % len(jsonContent['feats']))
  print('Converted %d feat templates' % len(jsonContent['featTemplates']))
