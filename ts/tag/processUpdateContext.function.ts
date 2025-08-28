import { StringTag } from './StringTag.type.js'
import type { DomTag } from './DomTag.type.js'
import { AnySupport } from './index.js'
import { ContextItem } from '../index.js'
import { TagJsVar } from '../tagJsVars/tagJsVar.type.js'
import { removeContextInCycle, setContextInCycle } from './cycles/setContextInCycle.function.js'

export function processUpdateContext(
  support: AnySupport,
  contexts: ContextItem[],
) {
  const thisTag = support.templater.tag as StringTag | DomTag
  const values = thisTag.values
  let index = 0
  const len = values.length

  while (index < len) {
    processUpdateOneContext(
      values,
      index,
      contexts,
      support,
    )
    
    ++index
  }

  return contexts
}

/** returns boolean of did render */
function processUpdateOneContext(
  values: unknown[], // the interpolated values
  index: number,
  contexts: ContextItem[],
  ownerSupport: AnySupport,
) {
  const contextItem = contexts[index]

  if( contextItem.deleted ) {
    return
  }

  // some values, like style, get rearranged and there value appearance may not match context appearance
  const valueIndex = contextItem.valueIndex
  const newValue = values[ valueIndex ] as any

  // Removed, let the tagJsVars do the checking
  // Do not continue if the value is just the same
  /*
  if(newValue === contextItem.value) {
    return
  }
  */

  const tagJsVar = contextItem.tagJsVar as TagJsVar
  
  setContextInCycle(contextItem)
  
  tagJsVar.processUpdate(
    newValue,
    contextItem,
    ownerSupport,
    values,
  )
  
  removeContextInCycle()
  
  contextItem.value = newValue
}
