import { StringTag } from './StringTag.type.js'
import type { DomTag } from './DomTag.type.js'
import { AnySupport } from './index.js'
import { ContextItem } from '../index.js'
import { TagJsTag } from '../TagJsTags/TagJsTag.type.js'
import { removeContextInCycle, setContextInCycle } from './cycles/setContextInCycle.function.js'

export function processUpdateContext(
  support: AnySupport,
  contexts: ContextItem[],
) {
  const thisTag = support.templater.tag as StringTag | DomTag
  const values = thisTag.values
  
  for (const context of contexts) {
    // const context = contexts[index]
    processUpdateOneContext(
      values,
      context,
      support,
    )
  }

  return contexts
}

/** returns boolean of did render */
function processUpdateOneContext(
  values: unknown[], // the interpolated values
  contextItem: ContextItem,
  ownerSupport: AnySupport,
) {
  if( contextItem.deleted ) {
    return
  }

  // some values, like style, get rearranged and there value appearance may not match context appearance
  const valueIndex = contextItem.valueIndex
  const newValue = values[ valueIndex ] as any

  // Removed, let the TagJsTags do the checking
  // Do not continue if the value is just the same
  /*
  if(newValue === contextItem.value) {
    return
  }
  */

  const TagJsTag = contextItem.tagJsVar as TagJsTag
  
  setContextInCycle(contextItem)
  
  TagJsTag.processUpdate(
    newValue,
    contextItem,
    ownerSupport,
    values,
  )
  
  removeContextInCycle()
  
  contextItem.value = newValue
}
