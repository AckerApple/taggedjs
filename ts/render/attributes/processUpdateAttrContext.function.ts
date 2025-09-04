import { AnySupport } from '../../tag/index.js'
import { ContextItem } from '../../tag/ContextItem.type.js'
import { processAttributeEmit } from './processAttribute.function.js'
import { HowToSet, setNonFunctionInputValue } from '../../interpolations/attributes/howToSetInputValue.function.js'
import { updateNameOnlyAttrValue } from '../../interpolations/attributes/updateNameOnlyAttrValue.function.js'
import { TemplateValue } from '../../tag/TemplateValue.type.js'
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js'
import { AttributeContextItem } from '../../tag/AttributeContextItem.type.js'
import { SupportContextItem } from '../../index.js'
import { removeContextInCycle, setContextInCycle } from '../../tag/cycles/setContextInCycle.function.js'

/** Currently universally used for all attributes */
export function processUpdateAttrContext(
  value: TemplateValue,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  values: unknown[],
) {
  const attrContextItem = contextItem as any as AttributeContextItem    
  const tagValue = value as TagJsVar | undefined

  if( tagValue?.tagJsType ) {
    const oldValue = contextItem.value as TagJsVar
    
    // its now a tagVar value but before was not
    if(!oldValue?.tagJsType) {
      tagValue.isAttr = true
      
      setContextInCycle(contextItem)
      
      tagValue.processInitAttribute(
        attrContextItem.attrName as string,
        value,
        attrContextItem.element as HTMLElement,
        tagValue,
        attrContextItem,
        ownerSupport,
        setNonFunctionInputValue,
      )
      
      removeContextInCycle()
      
      attrContextItem.tagJsVar = tagValue
      return
    }

    oldValue.checkValueChange(
      tagValue,
      contextItem as SupportContextItem, // todo: weird typing should just be ContextItem
      ownerSupport,
    )

    return
  }

  if(attrContextItem.isNameOnly) {
    updateNameOnlyAttrValue(
      values,
      value as string,
      attrContextItem.value,
      attrContextItem.element as Element,// global.element as Element,
      ownerSupport,
      attrContextItem.howToSet as HowToSet,
      [], // Context, but we dont want to alter current
      attrContextItem.parentContext,
    )

    attrContextItem.value = value

    return
  }

  const element = attrContextItem.element as Element

  processAttributeEmit(
    value,
    attrContextItem.attrName as string,
    attrContextItem,
    element as HTMLElement,
    ownerSupport,
    attrContextItem.howToSet as HowToSet,
    attrContextItem.isSpecial as boolean,
  )

  contextItem.value = value

  return
}
