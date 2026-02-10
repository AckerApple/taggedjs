import { specialAttribute } from './specialAttribute.js'
import { HowToSet, setNonFunctionInputValue } from './howToSetInputValue.function.js'
import { TagGlobal } from '../../tag/getTemplaterResult.function.js'
import { SpecialDefinition } from '../../render/attributes/Special.types.js'
import { ContextItem } from '../../tag/ContextItem.type.js'
import { AnySupport } from '../../tag/index.js'
import { TagJsTag } from '../../TagJsTags/TagJsTag.type.js'
import { AttributeContextItem } from '../../tag/AttributeContextItem.type.js'
import { processFunctionAttr } from './processFunctionAttr.function.js'

export function processDynamicNameValueAttribute(
  attrName: string,
  value: any | TagGlobal,
  contextItem: AttributeContextItem,
  element: Element,
  howToSet: HowToSet,
  support: AnySupport,
  isSpecial: SpecialDefinition,
) {
  contextItem.target = element as HTMLElement
  contextItem.howToSet = howToSet
  contextItem.attrName = attrName
  contextItem.isSpecial = isSpecial

  if( value?.tagJsType ) {
    return processTagJsAttribute(
      attrName,
      value,
      contextItem,
      support,
      element,
    )
  }

  return processNonDynamicAttr(
    attrName,
    value,
    element,
    howToSet,
    isSpecial,
    contextItem,
  )
}

function processTagJsAttribute(
  name: string,
  value: TagJsTag,
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
    setNonFunctionInputValue,
  )

  contextItem.tagJsVar = value
}

export function processNonDynamicAttr(
  attrName: string,
  value: string,
  element: Element,
  howToSet: HowToSet,
  isSpecial: SpecialDefinition,
  context: ContextItem,
): ContextItem | void {
  if( typeof value === 'function' ) {
    return processFunctionAttr(
      value,
      context,
      attrName,
      element as HTMLElement,
      howToSet,
    )
  }

  if (isSpecial) {
    return specialAttribute(
      attrName,
      value,
      element as HTMLElement,
      isSpecial,
    )
  }

  howToSet(element as HTMLElement, attrName, value)
}
