import { StringTag } from './StringTag.type.js'
import type { DomTag } from './DomTag.type.js'
import { AnySupport } from './AnySupport.type.js'
import { ContextItem, ContextHandler } from './Context.types.js'

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
export function processUpdateOneContext(
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
  
  handler(value, values, ownerSupport, contextItem)
  contextItem.value = value
}
