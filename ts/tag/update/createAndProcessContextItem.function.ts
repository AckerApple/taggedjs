// taggedjs-no-compile

import { paintAppends, paintInsertBefores } from '../paint.function.js'
import { checkSimpleValueChange, deleteSimpleValue } from '../checkDestroyPrevious.function.js'
import { Counts } from '../../interpolations/interpolateTemplate.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { ContextItem } from '../Context.types.js'
import { AnySupport } from '../AnySupport.type.js'
import { domProcessContextItem } from '../../interpolations/optimizers/domProcessContextItem.function.js'

/** Must provide insertBefore OR appendTo */
export function createAndProcessContextItem(
  value: TemplateValue,
  ownerSupport: AnySupport,
  counts: Counts,
  insertBefore?: Text, // used during updates
  appendTo?: Element, // used during initial entire array rendering
) {
  const element = document.createTextNode('')
  const contextItem: ContextItem = {
    value,
    checkValueChange: checkSimpleValueChange,
    delete: deleteSimpleValue,
    withinOwnerElement: false,
    placeholder: element,
  }

  counts.added = counts.added + 1 // index  

  if(!appendTo) {
    paintInsertBefores.push({
      element,
      relative: insertBefore as Text,
    })
  }

  domProcessContextItem(
    value,
    contextItem,
    ownerSupport,
    counts,
    appendTo,
    insertBefore,
  )

  if( appendTo ) {
    paintAppends.push({
      element,
      relative: appendTo,
    })
  }

  return contextItem
}
