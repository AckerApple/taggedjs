// taggedjs-no-compile

import { HowToSet } from './howToSetInputValue.function.js'
import { BasicTypes } from '../../tag/ValueTypes.enum.js'
import { AnySupport } from '../../tag/getSupport.function.js'
import { paintContent } from '../../tag/paint.function.js'
import { ContextItem } from '../../tag/Context.types.js'
import { Counts } from '../interpolateTemplate.js'
import { isNoDisplayValue, processNameOnlyAttrValue } from './processAttribute.function.js'


export function updateNameOnlyAttrValue(
  values: unknown[],
  attrValue: string | boolean | Record<string, any>,
  lastValue: string | Record<string, any> | undefined,
  element: Element,
  ownerSupport: AnySupport,
  howToSet: HowToSet,
  context: ContextItem[],
  counts: Counts,
) {
  // check to remove previous attribute(s)
  if(lastValue) {
    if(isNoDisplayValue(attrValue)) {
      element.removeAttribute(lastValue as string)
      return
    }

    if(typeof(lastValue) === BasicTypes.object) {
      const isObStill = typeof(attrValue) === BasicTypes.object
      if(isObStill) {
        for (const name in (lastValue as object)) {
          // if((attrValue as any)[name]) {
            if(name in (attrValue as any)) {
            continue
          }
          paintContent.push(function paintContent() {
            element.removeAttribute(name)
          })
        }
      } else {
        for (const name in (lastValue as object)) {
          paintContent.push(function paintContent() {
            element.removeAttribute(name)
          })
        }
      }
    }
  }

  processNameOnlyAttrValue(
    values,
    attrValue,
    element,
    ownerSupport,
    howToSet,
    context,
    counts,
  )
}
