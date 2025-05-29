import { specialAttribute } from './specialAttribute.js'
import { HowToSet } from './howToSetInputValue.function.js'
import { TagGlobal } from '../../tag/getTemplaterResult.function.js'
import { processTagCallbackFun } from '../../render/attributes/processAttribute.function.js'
import { SpecialAction, SpecialDefinition } from '../../render/attributes/Special.types.js'
import { ContextItem } from '../../tag/ContextItem.type.js'
import { AnySupport } from '../../tag/AnySupport.type.js'
import { BasicTypes } from '../../tag/ValueTypes.enum.js'
import type { TagCounts } from '../../tag/TagCounts.type.js'

const actions = ['init','destroy'] // oninit ondestroy

export function processDynamicNameValueAttribute(
  attrName: string,
  value: any | TagGlobal,
  contextItem: ContextItem,
  element: Element,
  howToSet: HowToSet,
  support: AnySupport,
  counts: TagCounts,
  isSpecial: SpecialDefinition,
) {
  // contextItem.attrName = attrName
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
  counts: TagCounts,
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

  howToSet(element, attrName, value)  
}
