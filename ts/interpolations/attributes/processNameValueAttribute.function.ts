// taggedjs-no-compile

import { specialAttribute } from './specialAttribute.js'
import { HowToSet } from './howToSetInputValue.function.js'
import { TagGlobal } from '../../tag/TemplaterResult.class.js'
import { processTagCallbackFun } from './processAttribute.function.js'
import { ContextItem } from '../../tag/Tag.class.js'
import { AnySupport } from '../../tag/Support.class.js'

export function processDynamicNameValueAttribute(
  attrName: string,
  value: any | TagGlobal,
  contextItem: ContextItem,
  element: Element,
  howToSet: HowToSet,
  support: AnySupport,
  isSpecial?: boolean
) {
  const global = contextItem.global as any
  const isFun = value instanceof Function
  global.attrName = attrName
  global.element = element
  global.howToSet = howToSet

  if(isFun) {
    return processTagCallbackFun(
      contextItem,
      value,
      support,
      attrName,
      element,
    )
  }

  // TODO: enhance this condition
  if(global) {
    global.attrName = attrName
    global.element = element
    global.howToSet = howToSet
    global.isSpecial = isSpecial // isSpecialAttr(attrName)
  }

  return processNonDynamicAttr(attrName, value, element, howToSet, isSpecial)
}

export function processNonDynamicAttr(
  attrName: string,
  value: string,
  element: Element,
  howToSet: HowToSet,
  isSpecial?: boolean,
) {
  // const isSpecial = isSpecialAttr(attrName)
  if (isSpecial) {
    return specialAttribute(attrName, value, element)
  }

  howToSet(element, attrName, value as string)  
}
