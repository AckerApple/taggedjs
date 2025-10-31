// taggedjs-no-compile

import { HowToSet, setNonFunctionInputValue } from '../../interpolations/attributes/howToSetInputValue.function.js'
import { BasicTypes, empty } from '../../tag/ValueTypes.enum.js'
import { AnySupport } from '../../tag/index.js'
import { ContextItem } from '../../tag/ContextItem.type.js'
import { isSpecialAttr } from '../../interpolations/attributes/isSpecialAttribute.function.js'
import { isNoDisplayValue } from './isNoDisplayValue.function.js'
import { HostValue } from '../../tagJsVars/host.function.js'
import { processAttribute } from './processAttribute.function.js'

// single/stand alone attributes
export function processStandAloneAttribute(
  values: unknown[],
  attrValue: string | boolean | Record<string, any> | HostValue,
  element: HTMLElement,
  ownerSupport: AnySupport,
  howToSet: HowToSet,
  contexts: ContextItem[],
  parentContext: ContextItem,
): ContextItem[] | void {
  if(isNoDisplayValue(attrValue)) {
    return
  }

  const newContexts: ContextItem[] = []

  // process an object of attributes ${{class:'something, checked:true}}
  if(typeof attrValue === BasicTypes.object) {
    for (const name in (attrValue as any)) {
      const isSpecial = isSpecialAttr(name) // only object variables are evaluated for is special attr
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
        isSpecial,
      )
      
      
      if(subContext !== undefined) {
        if(Array.isArray(subContext)) {
          newContexts.push( ...subContext )
        } else {
          newContexts.push( subContext )
        }
      }
    }
    return newContexts
  }

  // regular attributes
  if((attrValue as string).length === 0) {
    return // ignore, do not set at this time
  }

  howToSet(element, attrValue as string, empty)
}
