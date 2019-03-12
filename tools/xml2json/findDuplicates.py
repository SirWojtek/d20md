
def findDuplicates(jsonList):
  spellNames = list(map(lambda x: x['name'], jsonList))
  duplicates = set([x for x in spellNames if spellNames.count(x) > 1])
  if (len(duplicates) > 0):
    raise Exception('Duplicated: ' + repr(duplicates))
