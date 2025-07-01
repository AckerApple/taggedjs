import { StringTag } from './StringTag.type.js'
import type { DomTag } from './DomTag.type.js'
import { AnySupport } from './AnySupport.type.js'
import { ContextItem, TagCounts } from '../index.js'
import { TagJsVar } from '../tagJsVars/tagJsVar.type.js'

export function processUpdateContext(
  support: AnySupport,
  contexts: ContextItem[],
) {
  const thisTag = support.templater.tag as StringTag | DomTag
  const values = thisTag.values
  let index = 0
  const len = values.length
  const counts = { added: 0, removed: 0 }

  while (index < len) {
    processUpdateOneContext(
      values,
      index,
      contexts,
      support,
      counts,
    )
    
    ++index
  }

  return contexts
}

/** returns boolean of did render */
function processUpdateOneContext(
  values: unknown[], // the interpolated values
  index: number,
  context: ContextItem[],
  ownerSupport: AnySupport,
  counts: TagCounts,
) {
  const newValue = values[index] as any
  const contextItem = context[index]

  // Do not continue if the value is just the same
  if(newValue === contextItem.value) {
    return
  }

  const tagJsVar = contextItem.tagJsVar as TagJsVar

  tagJsVar.processUpdate(
    newValue,
    ownerSupport,
    contextItem,
    counts,
    values,
  )
  
  contextItem.value = newValue
  // contextItem.tagJsVar = valueToTagJsVar(newValue)
}
