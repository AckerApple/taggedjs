// taggedjs-no-compile

import { specialAttribute } from './specialAttribute.js'
import { HowToSet } from './howToSetInputValue.function.js'
import { TagGlobal } from '../../tag/TemplaterResult.class.js'
import { processTagCallbackFun, SpecialDefinition } from './processAttribute.function.js'
import { ContextItem } from '../../tag/Context.types.js'
import { AnySupport } from '../../tag/Support.class.js'
import { BasicTypes } from '../../tag/ValueTypes.enum.js'

export function processDynamicNameValueAttribute(
  attrName: string,
  value: any | TagGlobal,
  contextItem: ContextItem,
  element: Element,
  howToSet: HowToSet,
  support: AnySupport,
  isSpecial?: SpecialDefinition,
) {  
  contextItem.attrName = attrName
  contextItem.element = element
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
  contextItem.element = element
  contextItem.howToSet = howToSet
  contextItem.isSpecial = isSpecial

  return processNonDynamicAttr(attrName, value, element, howToSet, isSpecial)
}

export function processNonDynamicAttr(
  attrName: string,
  value: string,
  element: Element,
  howToSet: HowToSet,
  isSpecial?: SpecialDefinition,
) {
  if (isSpecial) {
    return specialAttribute(attrName, value, element, isSpecial)
  }

  howToSet(element, attrName, value as string)  
}