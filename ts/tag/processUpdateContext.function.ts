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

  const TagJsTag = contextItem.tagJsVar as TagJsTag<any>
  
  setContextInCycle(contextItem)
  
  TagJsTag.processUpdate(
    '' as any, // newValue,
    contextItem,
    ownerSupport,
    values,
  )
  
  removeContextInCycle()
  
  // contextItem.value = newValue
}
