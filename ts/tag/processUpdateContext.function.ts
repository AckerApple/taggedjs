import { AnySupport } from './Support.class.js'
import { Context, ContextItem, DomTag, StringTag } from './Tag.class.js'
import { updateExistingValue } from './update/updateExistingValue.function.js'
import { processAttributeEmit, processNameOnlyAttrValue } from '../interpolations/attributes/processAttribute.function.js'
import { HowToSet } from '../interpolations/attributes/howToSetInputValue.function.js'
import { TagGlobal } from './index.js'

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
): boolean {
  const value = values[index] as any

  // is something already there?
  const contextItem = context[index]

  // Do not continue if the value is just the same
  if(value === contextItem.value) {
    return false
  }

  if(value instanceof Object && 'subscribe' in value) {
    return false // emits on its own
  }

  const global = contextItem.global as any
  if(global.isAttr) {
    return processUpdateAttrContext(
      values, value, contextItem, ownerSupport
    )
  }

  // listeners will evaluate updated values to possibly update display(s)
  const result = updateExistingValue(
    contextItem,
    value,
    ownerSupport,
  ).rendered
  
  contextItem.value = value

  return result
}

function processUpdateAttrContext(
  values: unknown[],
  value: unknown,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
) {
  const global = contextItem.global as any
  if(global.isNameOnly) {
    processNameOnlyAttrValue(
      values,
      value as string,
      contextItem.value,
      global.element as Element,
      ownerSupport,
      global.howToSet as HowToSet,
      [], // Context, but we dont want to alter current
    )

    contextItem.value = value

    return false
  }

  const element = global.element as Element
  processAttributeEmit(
    value,
    global.attrName as string,
    contextItem,
    element,
    ownerSupport,
    global.howToSet as HowToSet,
    global.isSpecial as boolean,
  )

  contextItem.value = value

  return false
}
