// taggedjs-no-compile

import { paintAppend, paintAppends, paintBefore, paintCommands } from '../../render/paint.function.js'
import type { TagCounts } from '../../tag/TagCounts.type.js'
import { AdvancedContextItem } from '../AdvancedContextItem.type.js'
import { AnySupport } from '../AnySupport.type.js'
import { domProcessContextItem } from '../../interpolations/optimizers/domProcessContextItem.function.js'
import { empty } from '../ValueTypes.enum.js'
import { TemplateValue } from '../TemplateValue.type.js'
import { valueToTagJsVar } from '../../tagJsVars/valueToTagJsVar.function.js'

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
    tagJsVar: valueToTagJsVar(value),
    withinOwnerElement: false,
    placeholder: element,
  }

  if(!appendTo) {
    paintCommands.push([paintBefore, [insertBefore, element]])
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
    paintAppends.push([paintAppend, [appendTo, element]])
  }

  return contextItem
}
