import { StringTag } from './StringTag.type.js'
import type { DomTag } from './DomTag.type.js'
import { AnySupport } from './AnySupport.type.js'
import { ContextHandler } from './Context.types.js'
import { ContextItem } from '../index.js'
import { valueToTagJsVar } from '../tagJsVars/valueToTagJsVar.function.js'

export function processUpdateContext(
  support: AnySupport,
  context: ContextItem[],
) {
  const thisTag = support.templater.tag as StringTag | DomTag
  const values = thisTag.values
  let index = 0
  const len = values.length

  while (index < len) {
    processUpdateOneContext(
      values,
      index,
      context,
      support,
    )
    
    ++index
  }

  return context
}

/** returns boolean of did render */
function processUpdateOneContext(
  values: unknown[], // the interpolated values
  index: number,
  context: ContextItem[],
  ownerSupport: AnySupport,
) {
  const value = values[index] as any

  // is something already there?
  const contextItem = context[index]

  // Do not continue if the value is just the same
  if(value === contextItem.value) {
    return
  }

  const handler = contextItem.handler as ContextHandler
  
  handler(
    value,
    ownerSupport,
    contextItem,
    values,
  )
  
  contextItem.value = value
  contextItem.tagJsVar = valueToTagJsVar(value)
}
