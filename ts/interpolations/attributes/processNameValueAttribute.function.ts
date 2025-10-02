import { specialAttribute } from './specialAttribute.js'
import { HowToSet, setNonFunctionInputValue } from './howToSetInputValue.function.js'
import { TagGlobal } from '../../tag/getTemplaterResult.function.js'
import { processTagCallbackFun } from '../../render/attributes/processAttribute.function.js'
import { SpecialDefinition } from '../../render/attributes/Special.types.js'
import { ContextItem } from '../../tag/ContextItem.type.js'
import { AnySupport } from '../../tag/index.js'
import { BasicTypes } from '../../tag/ValueTypes.enum.js'
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js'
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
  _contexts: ContextItem[],
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
) {
  if (isSpecial) {
    return specialAttribute(
      attrName,
      value,
      element,
      isSpecial,
    )
  }

  if( typeof value === 'function') {
    return processFunctionAttr(
      value,
      context,
      attrName,
      element as HTMLElement,
      howToSet,
    )
  }

  howToSet(element as HTMLElement, attrName, value)
}

