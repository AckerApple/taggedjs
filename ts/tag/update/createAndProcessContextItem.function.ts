// taggedjs-no-compile

import { paintAppend, paintAppends, paintBefore, paintCommands } from '../../render/paint.function.js'
import { Counts } from '../../interpolations/interpolateTemplate.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { AdvancedContextItem, ContextItem } from '../Context.types.js'
import { AnySupport } from '../AnySupport.type.js'
import { domProcessContextItem } from '../../interpolations/optimizers/domProcessContextItem.function.js'

/** Must provide insertBefore OR appendTo */
export function createAndProcessContextItem(
  value: TemplateValue,
  ownerSupport: AnySupport,
  counts: Counts,
  insertBefore?: Text, // used during updates
  appendTo?: Element, // used during initial entire array rendering
): AdvancedContextItem {
  const element = document.createTextNode('')
  const contextItem: AdvancedContextItem = {
    value,
    checkValueChange: undefined as any, // gets populated in domProcessContextItem
    delete: undefined as any, // gets populated in domProcessContextItem
    withinOwnerElement: false,
    placeholder: element,
  }

  counts.added = counts.added + 1 // index  

  if(!appendTo) {
    paintCommands.push({
      processor: paintBefore,
      args: [insertBefore, element],
    })
  }

  domProcessContextItem(
    value,
    ownerSupport,
    contextItem,
    counts,
    appendTo,
    insertBefore,
  )

  if( appendTo ) {
    paintAppends.push({
      processor: paintAppend,
      args: [appendTo, element],
    })
  }

  return contextItem
}
