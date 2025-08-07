import { specialAttribute } from './specialAttribute.js'
import { HowToSet } from './howToSetInputValue.function.js'
import { TagGlobal } from '../../tag/getTemplaterResult.function.js'
import { processTagCallbackFun } from '../../render/attributes/processAttribute.function.js'
import { SpecialDefinition } from '../../render/attributes/Special.types.js'
import { ContextItem } from '../../tag/ContextItem.type.js'
import { AnySupport } from '../../tag/AnySupport.type.js'
import { BasicTypes } from '../../tag/ValueTypes.enum.js'
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js'
import { AttributeContextItem } from '../../tag/AttributeContextItem.type.js'

export function processDynamicNameValueAttribute(
  attrName: string,
  value: any | TagGlobal,
  contextItem: AttributeContextItem,
  element: Element,
  howToSet: HowToSet,
  support: AnySupport,
  isSpecial: SpecialDefinition,
) {
  contextItem.element = element as HTMLElement
  contextItem.howToSet = howToSet

  if(typeof(value) === BasicTypes.function ) {
    return processTagCallbackFun(
      contextItem,
      value,
      support,
      attrName,
      element,
    )
  }

  contextItem.attrName = attrName
  contextItem.isSpecial = isSpecial

  if( value?.tagJsType ) {
    processTagJsAttribute(attrName, value, contextItem, support, element)
    return
  }

  return processNonDynamicAttr(
    attrName,
    value,
    element,
    howToSet,
    isSpecial,
  )
}

export function processTagJsAttribute(
  name: string,
  value: TagJsVar,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  element: Element,
) {
  value.processInitAttribute(
    name,
    value,
    element as HTMLElement,
    value,
    contextItem,
    ownerSupport,
  )

  contextItem.tagJsVar = value
}



export function processNonDynamicAttr(
  attrName: string,
  value: string,
  element: Element,
  howToSet: HowToSet,
  isSpecial: SpecialDefinition,
) {
  if (isSpecial) {
    return specialAttribute(
      attrName,
      value,
      element,
      isSpecial,
    )
  }

  howToSet(element as HTMLElement, attrName, value)  
}
