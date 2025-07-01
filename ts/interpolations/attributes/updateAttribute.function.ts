// taggedjs-no-compile

import { HowToSet } from './howToSetInputValue.function.js'
import { BasicTypes } from '../../tag/ValueTypes.enum.js'
import { AnySupport } from '../../tag/AnySupport.type.js'
import { paintContent } from '../../render/paint.function.js'
import { ContextItem } from '../../tag/ContextItem.type.js'
import type { TagCounts } from '../../tag/TagCounts.type.js'
import { processNameOnlyAttrValue } from '../../render/attributes/processAttribute.function.js'
import { isNoDisplayValue } from '../../render/attributes/isNoDisplayValue.function.js'


export function updateNameOnlyAttrValue(
  values: unknown[],
  attrValue: string | boolean | Record<string, any>,
  lastValue: string | Record<string, any> | undefined,
  element: Element,
  ownerSupport: AnySupport,
  howToSet: HowToSet,
  context: ContextItem[],
  counts: TagCounts,
) {
  // check to remove previous attribute(s)
  if(lastValue) {
    if( isNoDisplayValue(attrValue) ) {
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
          paintContent.push([removeAttribute, [element, name]])
        }
      } else {
        for (const name in (lastValue as object)) {
          paintContent.push([removeAttribute, [element, name]])
        }
      }
    }
  }

  processNameOnlyAttrValue(
    values,
    attrValue,
    element as HTMLElement,
    ownerSupport,
    howToSet,
    context,
    counts,
  )
}

function removeAttribute(
  element: Element,
  name: string,
) {
  element.removeAttribute(name)
}