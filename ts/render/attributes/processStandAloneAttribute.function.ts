// taggedjs-no-compile

import { HowToSet, setNonFunctionInputValue } from '../../interpolations/attributes/howToSetInputValue.function.js'
import { BasicTypes, empty } from '../../tag/ValueTypes.enum.js'
import { AnySupport, tag, TemplateValue } from '../../tag/index.js'
import { ContextItem } from '../../tag/ContextItem.type.js'
import { isSpecialAttr } from '../../interpolations/attributes/isSpecialAttribute.function.js'
import { isNoDisplayValue } from './isNoDisplayValue.function.js'
import { HostValue } from '../../TagJsTags/host.function.js'
import { processAttribute } from './processAttribute.function.js'
import { removeContextInCycle, setContextInCycle } from '../../tag/cycles/setContextInCycle.function.js'
import { processTagJsTagAttribute } from './processTagJsAttribute.function.js'
import { valueToTagJsVar } from '../../TagJsTags/valueToTagJsVar.function.js'
import { TagJsTag } from '../../TagJsTags/TagJsTag.type.js'
import { AttributeContextItem } from '../../tag/AttributeContextItem.type.js'

// single/stand alone attributes
export function processStandAloneAttribute(
  values: unknown[],
  attrValue: string | boolean | Record<string, any> | HostValue,
  element: HTMLElement,
  ownerSupport: AnySupport,
  howToSet: HowToSet,
  contexts: ContextItem[],
  parentContext: ContextItem,
  contextItem: ContextItem,
): ContextItem[] | void {
  if(isNoDisplayValue(attrValue)) {
    return
  }

  const type = typeof attrValue

  // process an object of attributes ${{class:'something, checked:true}}
  if(type === BasicTypes.object) {
    for (const name in (attrValue as any)) {
      processOneStandAlone(
        name,
        element,
        attrValue,
        values,
        ownerSupport,
        contexts,
        parentContext,
        contexts,
      )
    }
    return contexts
  }

  if( type === 'function' ) {
    const relay = createMiddleFunctionTagJsVar( contextItem )
    contextItem.tagJsVar = relay

    setContextInCycle(contextItem)
    
    const result = (attrValue as any)(contextItem)
    
    const attrCallResult = valueToTagJsVar( result )

    removeContextInCycle()

    if( (attrCallResult as any)?.tagJsType ) {
      contextItem.state = {
        newer: {
          state: [],
          states: [],
        },
      }

      const newContext = processTagJsTagAttribute(
        attrCallResult as any,
        contexts, // contexts,
        parentContext,
        attrCallResult,
        -1, // varIndex,
        ownerSupport,
        'attr', // attrName,
        element,
        true, // isNameVar,
      ) as any

      newContext.tagJsVar = attrCallResult
      contextItem.subContext = newContext
      return contexts
    }

    processOneStandAlone(
      'attr',
      element,
      attrValue,
      values || [],
      ownerSupport,
      contexts,
      parentContext,
      contexts,
    )

    return contexts
  }
 
  // regular attributes
  if((attrValue as string).length === 0) {
    return // ignore, do not set at this time
  }

  howToSet(element, attrValue as string, empty)
}
function processOneStandAlone(
  name: string,
  element: HTMLElement,
  attrValue: string | boolean | Record<string, any> | HostValue,
  values: unknown[],
  ownerSupport: AnySupport,
  contexts: ContextItem[],
  parentContext: ContextItem,
  newContexts: ContextItem[],
) {
  const isSpecial = isSpecialAttr(name, element.tagName) // only object variables are evaluated for is special attr
  const value = (attrValue as any)[name]
  const howToSet: HowToSet = setNonFunctionInputValue

  const subContext = processAttribute(
    name,
    value,
    values,
    element,
    ownerSupport,
    howToSet,
    contexts,
    parentContext,
    isSpecial
  )

  if (subContext !== undefined) {
    if (Array.isArray(subContext)) {
      newContexts.push(...subContext)
    } else {
      newContexts.push(subContext)
    }
  }
}

/** used for an output function variable */
function createMiddleFunctionTagJsVar( context: ContextItem ) {
  const myTagJsVar: TagJsTag<any> = {
    tagJsType: 'relay',
    component: false,
    hasValueChanged: (
      value: unknown,
      context: ContextItem,
      ownerSupport: AnySupport,
    ) => {
      return (context.subContext as any).tagJsVar.hasValueChanged(
        value,
        context.subContext,
        ownerSupport,
      )
    },

    processInitAttribute: (
      name: string,
      value: any, // TemplateValue | StringTag | SubscribeValue | SignalObject,
      element: HTMLElement,
      tagJsVar: TagJsTag<any>,
      contextItem: AttributeContextItem,
      ownerSupport: AnySupport, // may not be needed?
      howToSet: HowToSet,
    ) => {
      return (contextItem.subContext as any).tagJsVar.processInitAttribute(
        name,
        value,
        element,
        tagJsVar,
        contextItem.subContext, // contextItem,
        ownerSupport,
        howToSet,
      )
    },

    destroy: (
      contextItem: ContextItem,
      ownerSupport: AnySupport,
    ) => {
      return (contextItem.subContext as any).tagJsVar.destroy(contextItem.subContext, ownerSupport)
    },

    processUpdate: (
      value: any,
      contextItem: ContextItem,
      ownerSupport: AnySupport,
      values: unknown[],
    ) => {
      const result = value(contextItem.subContext)
      return (contextItem.subContext as any).tagJsVar.processUpdate(
        result,
        contextItem.subContext,
        ownerSupport,
        values,
      )
    },
    processInit: (
      value: any, // TemplateValue | StringTag | SubscribeValue | SignalObject,
      contextItem: ContextItem,
      ownerSupport: AnySupport,
      insertBefore?: Text,
      appendTo?: Element,
    ) => {
      return (contextItem.subContext as any).tagJsVar.processInit(
        value,
        contextItem.subContext,
        ownerSupport,
        insertBefore,
        appendTo,
      )
    },
    matchesInjection: (inject) => {
      return (context.subContext as any).tagJsVar.matchesInjection(inject, context.subContext)
    },
  }

  return myTagJsVar
}