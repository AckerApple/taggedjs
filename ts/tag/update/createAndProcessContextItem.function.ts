// taggedjs-no-compile

import { paintAppend, paintAppends, paintBefore, paintCommands } from '../../render/paint.function.js'
import type { TagCounts } from '../../tag/TagCounts.type.js'
import { AdvancedContextItem } from '../AdvancedContextItem.type.js'
import { AnySupport } from '../AnySupport.type.js'
import { domProcessContextItem } from '../../interpolations/optimizers/domProcessContextItem.function.js'
import { empty } from '../ValueTypes.enum.js'
import { TemplateValue } from '../TemplateValue.type.js'

/** Must provide insertBefore OR appendTo */
export function createAndProcessContextItem(
  value: TemplateValue,
  ownerSupport: AnySupport,
  counts: TagCounts,
  insertBefore?: Text, // used during updates
  appendTo?: Element, // used during initial entire array rendering
): AdvancedContextItem {
  const element = document.createTextNode(empty)
  const contextItem: AdvancedContextItem = {
    value,
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
