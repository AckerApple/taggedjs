import { AnySupport } from './Support.class.js'
import { Context, ContextItem, DomTag, StringTag, Tag } from './Tag.class.js'
import { SupportTagGlobal, TagGlobal } from './TemplaterResult.class.js'
import { ValueTypes } from './ValueTypes.enum.js'
import { updateExistingValue } from './update/updateExistingValue.function.js'
import { TemplateValue } from './update/processFirstSubject.utils.js'
import { getValueType } from './getValueType.function.js'
import { processAttributeEmit, processNameOnlyAttrValue } from '../interpolations/attributes/processAttribute.function.js'
import { HowToSet } from '../interpolations/attributes/howToSetInputValue.function.js'
import { processFirstSubjectValue } from './update/processFirstSubjectValue.function.js'

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
  const global = context[index].global as SupportTagGlobal

  // Do not continue if the value is just the same
  if(value === contextItem.value) {
    return false
  }

  const valueType = getValueType(value)
  if(valueType === ValueTypes.subject) {
    return false // emits on its own
  }

  global.nowValueType = valueType

  if(global.isAttr) {
    return processUpdateAttrContext(
      values, value, contextItem, global, ownerSupport
    )
  }

  // listeners will evaluate updated values to possibly update display(s)
  const result = updateExistingValue(
    contextItem,
    value,
    ownerSupport,
  ).rendered
  
  contextItem.value = value
  global.lastValueType = valueType

  return result
}

function processUpdateAttrContext(
  values: unknown[],
  value: unknown,
  contextItem: ContextItem,
  global: TagGlobal,
  ownerSupport: AnySupport,
) {
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

  const element = contextItem.global.element as Element
  processAttributeEmit(
    value,
    contextItem.global.attrName as string,
    contextItem,
    element,
    ownerSupport,
    contextItem.global.howToSet as HowToSet,
    contextItem.global.isSpecial as boolean,
  )

  contextItem.value = value

  return false
}

