// taggedjs-no-compile

import { specialAttribute } from './specialAttribute.js'
import { HowToSet } from './howToSetInputValue.function.js'
import { TagGlobal } from '../../tag/TemplaterResult.class.js'
import { processTagCallbackFun } from './processAttribute.function.js'
import { ContextItem } from '../../tag/Tag.class.js'
import { AnySupport } from '../../tag/Support.class.js'

export function processNameValueAttribute(
  attrName: string,
  value: any,
  element: Element,
  howToSet: HowToSet,
  support: AnySupport,
  isSpecial?: boolean
) {
  const global = value?.global as TagGlobal
  
  if(global) {
    const contextItem = value as ContextItem
    const isFun = contextItem.value instanceof Function
    global.attrName = attrName
    global.element = element
    global.howToSet = howToSet
  
    if(isFun) {
      return processTagCallbackFun(
        contextItem,
        contextItem.value,
        support,
        attrName,
        element,
      )
    }

    value = value.value

    // TODO: enhance this condition
    if(global) {
      global.attrName = attrName
      global.element = element
      global.howToSet = howToSet
      global.isSpecial = isSpecial // isSpecialAttr(attrName)
    }
  }

  return processNonDynamicAttr(attrName, value, element, howToSet, isSpecial)
}

function processNonDynamicAttr(
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
