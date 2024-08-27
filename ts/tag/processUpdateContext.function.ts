import { AnySupport } from './Support.class.js'
import { DomTag, StringTag } from './Tag.class.js'
import { updateExistingValue } from './update/updateExistingValue.function.js'
import { processAttributeEmit, updateNameOnlyAttrValue } from '../interpolations/attributes/processAttribute.function.js'
import { HowToSet } from '../interpolations/attributes/howToSetInputValue.function.js'
import { Context, ContextItem } from './Context.types.js'
import { isSubjectInstance } from '../isInstance.js'

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

  // Do not continue if the value is just the same
  if(value === contextItem.value) {
    return
  }

  if(isSubjectInstance(value)) {
    return // emits on its own
  }

  if(contextItem.isAttr) {
    return processUpdateAttrContext(
      values, value, contextItem, ownerSupport
    )
  }

  // listeners will evaluate updated values to possibly update display(s)
  updateExistingValue(
    contextItem,
    value,
    ownerSupport,
  )
  
  contextItem.value = value
}

function processUpdateAttrContext(
  values: unknown[],
  value: unknown,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
) {
  if(contextItem.isNameOnly) {
    updateNameOnlyAttrValue(
      values,
      value as string,
      contextItem.value,
      contextItem.element as Element,// global.element as Element,
      ownerSupport,
      contextItem.howToSet as HowToSet,
      [], // Context, but we dont want to alter current
    )

    contextItem.value = value

    return false
  }

  const element = contextItem.element as Element
  processAttributeEmit(
    value,
    contextItem.attrName as string,
    contextItem,
    element,
    ownerSupport,
    contextItem.howToSet as HowToSet,
    contextItem.isSpecial as boolean,
  )

  contextItem.value = value

  return false
}
