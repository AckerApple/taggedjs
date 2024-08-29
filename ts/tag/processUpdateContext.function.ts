import { AnySupport } from './Support.class.js'
import { DomTag, StringTag } from './Tag.class.js'
import { updateExistingValue } from './update/updateExistingValue.function.js'
import { Context } from './Context.types.js'
import { isSubjectInstance } from '../isInstance.js'
import { processUpdateAttrContext } from './processUpdateAttrContext.function.js'

export function processUpdateContext(
  support: AnySupport,
  context: Context,
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
  values: unknown[],
  index: number,
  context: Context,
  ownerSupport: AnySupport,
) {
  const value = values[index] as any

  // is something already there?
  const contextItem = context[index]

  if(isSubjectInstance(value)) {
    return // emits on its own
  }

  if(contextItem.isAttr) {
    // Do not continue if the value is just the same
    if(value === contextItem.value) {
      return
    }

    processUpdateAttrContext(
      values, value, contextItem, ownerSupport
    )

    contextItem.value = value
  }

  // listeners will evaluate updated values to possibly update display(s)
  updateExistingValue(
    contextItem,
    value,
    ownerSupport,
  )
  
  contextItem.value = value
}
