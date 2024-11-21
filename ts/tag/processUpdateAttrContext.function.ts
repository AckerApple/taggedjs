import { AnySupport } from './Support.class.js'
import { ContextItem } from './Context.types.js'
import { processAttributeEmit, updateNameOnlyAttrValue } from '../interpolations/attributes/processAttribute.function.js'
import { HowToSet } from '../interpolations/attributes/howToSetInputValue.function.js'
import { Counts } from '../interpolations/interpolateTemplate.js'

const emptyCounts: Counts = {added: 0, removed: 0}

export function processUpdateAttrContext(
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
      emptyCounts,
    )

    contextItem.value = value

    return
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
    emptyCounts,
  )

  contextItem.value = value

  return
}
