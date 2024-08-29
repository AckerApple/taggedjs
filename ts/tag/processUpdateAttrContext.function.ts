import { AnySupport } from './Support.class.js'
import { ContextItem } from './Context.types.js'
import { processAttributeEmit, updateNameOnlyAttrValue } from '../interpolations/attributes/processAttribute.function.js'
import { HowToSet } from '../interpolations/attributes/howToSetInputValue.function.js'

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
  )

  contextItem.value = value

  return
}
