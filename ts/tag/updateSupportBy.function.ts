import { getValueType } from './getValueType.function.js'
import { processAttributeEmit, processNameOnlyAttrValue } from '../interpolations/attributes/processAttribute.function.js'
import { HowToSet } from '../interpolations/attributes/howToSetInputValue.function.js'
import { destroySupport } from './destroySupport.function.js'
import { paint, painting } from './paint.function.js'
import { AnySupport, Support } from './Support.class.js'
import { Context, DomTag, StringTag, Tag } from './Tag.class.js'
import { updateContextItem, updateOneContextValue } from './update/updateContextItem.function.js'
import { ValueTypes } from './ValueTypes.enum.js'

export function updateSupportBy(
  fromSupport: AnySupport,
  toSupport: AnySupport,
) {
  const global = fromSupport.subject.global
  const context = global.context as Context
  const tempTag = (toSupport.templater.tag || toSupport.templater) as DomTag | StringTag
  const values = (toSupport.templater as any as Tag).values || tempTag.values
  const tag = fromSupport.templater.tag as any
  tag.values = values
  
  ++painting.locks    
  processUpdateContext(fromSupport, context)
  --painting.locks

  paint()
}

function processUpdateContext(
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

  const valueType = getValueType(value)
  if(valueType === ValueTypes.subject) {
    return false // emits on its own
  }

  // is something already there?
  const contextItem = context[index]
  const global = context[index].global

  if(value === contextItem.value) {
    return false
  }

  global.nowValueType = valueType

  if(global.isAttr) {
    // contextItem.global.newest = ownerSupport
    if(global.isNameOnly) {
      processNameOnlyAttrValue(
        value,
        contextItem.value,
        global.element as Element,
        ownerSupport,
        global.howToSet as HowToSet,
      )

      updateOneContextValue(value, contextItem)

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

    updateOneContextValue(value, contextItem)

    return false
  }

  if(global.deleted) {
    const valueSupport = (value && value.support) as Support
    if(valueSupport) {
      destroySupport(valueSupport, 0)
      context // item was deleted, no need to emit
      return false
    }
  }
  
  return updateContextItem(contextItem, value, ownerSupport, valueType)
}
