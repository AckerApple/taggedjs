// taggedjs-no-compile

import { specialAttribute } from './specialAttribute.js'
import { HowToSet } from './howToSetInputValue.function.js'
import { TagGlobal } from '../../tag/getTemplaterResult.function.js'
import { processTagCallbackFun, SpecialAction, SpecialDefinition } from './processAttribute.function.js'
import { ContextItem } from '../../tag/Context.types.js'
import { AnySupport } from '../../tag/getSupport.function.js'
import { BasicTypes } from '../../tag/ValueTypes.enum.js'
import { Counts } from '../interpolateTemplate.js'

const actions = ['init','destroy'] // oninit ondestroy

export function processDynamicNameValueAttribute(
  attrName: string,
  value: any | TagGlobal,
  contextItem: ContextItem,
  element: Element,
  howToSet: HowToSet,
  support: AnySupport,
  counts: Counts,
  isSpecial: SpecialDefinition,
) {  
  contextItem.attrName = attrName
  contextItem.element = element
  contextItem.howToSet = howToSet

  if(typeof(value) === BasicTypes.function ) {
    if (isSpecial && actions.includes(attrName)) {
      specialAttribute(
        attrName,
        value,
        element,
        attrName as SpecialAction,
        support,
        counts,
      )
      return
    }
  
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

  return processNonDynamicAttr(
    attrName,
    value,
    element,
    howToSet,
    counts,
    support,
    isSpecial,
  )
}

export function processNonDynamicAttr(
  attrName: string,
  value: string,
  element: Element,
  howToSet: HowToSet,
  counts: Counts,
  support: AnySupport,
  isSpecial: SpecialDefinition,
) {
  if (isSpecial) {
    return specialAttribute(
      attrName,
      value,
      element,
      isSpecial,
      support,
      counts,
    )
  }

  howToSet(element, attrName, value as string)  
}
