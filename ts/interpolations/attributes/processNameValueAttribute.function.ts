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
import { blankHandler } from '../../render/dom/blankHandler.function.js'
import { Subject } from '../../index.js'

export function processDynamicNameValueAttribute(
  attrName: string,
  value: any | TagGlobal,
  contextItem: AttributeContextItem,
  element: Element,
  howToSet: HowToSet,
  support: AnySupport,
  isSpecial: SpecialDefinition,
  contexts: ContextItem[],
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
    contextItem,
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
    const endValue = (value as any)()    
    setNonFunctionInputValue(
      element as HTMLElement,
      attrName,
      endValue,
    )

    const contextItem = {
      parentContext: context,
      tagJsVar: {
        tagJsType: 'dynamic-text',
        checkValueChange: () => 0,
        processInit: blankHandler,
        processInitAttribute: blankHandler,
        destroy: blankHandler,
        processUpdate: () => {
          const endValue = (value as any)()    
          setNonFunctionInputValue(
            element as HTMLElement,
            attrName,
            endValue,
          )
        }
      },

        // TODO: Not needed
      valueIndex: -1,
      withinOwnerElement: true,
      destroy$: new Subject(),
    }
    return contextItem
  }

  howToSet(element as HTMLElement, attrName, value)  
}
