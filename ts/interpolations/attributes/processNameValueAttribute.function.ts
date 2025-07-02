import { specialAttribute } from './specialAttribute.js'
import { HowToSet } from './howToSetInputValue.function.js'
import { TagGlobal } from '../../tag/getTemplaterResult.function.js'
import { processTagCallbackFun } from '../../render/attributes/processAttribute.function.js'
import { SpecialDefinition } from '../../render/attributes/Special.types.js'
import { ContextItem } from '../../tag/ContextItem.type.js'
import { AnySupport } from '../../tag/AnySupport.type.js'
import { BasicTypes } from '../../tag/ValueTypes.enum.js'
import type { TagCounts } from '../../tag/TagCounts.type.js'

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
    )
  }

  howToSet(element as HTMLElement, attrName, value)  
}
