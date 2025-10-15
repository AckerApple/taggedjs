// taggedjs-no-compile

import { paintAppend, paintAppends } from '../../render/paint.function.js'
import { AnySupport } from '../index.js'
import { domProcessContextItem } from '../../interpolations/optimizers/domProcessContextItem.function.js'
import { empty } from '../ValueTypes.enum.js'
import { TemplateValue } from '../TemplateValue.type.js'
import { valueToTagJsVar } from '../../tagJsVars/valueToTagJsVar.function.js'
import { ContextItem } from '../ContextItem.type.js'
import { Subject } from '../../subject/Subject.class.js'
import { getNewContext } from '../../render/addOneContext.function.js'

/** Used by arrays and subcontext creators like subscribe. Must provide insertBefore OR appendTo */
export function createAndProcessContextItem(
  value: TemplateValue,
  ownerSupport: AnySupport,
  contexts: ContextItem[],
  insertBefore?: Text, // used during updates
  appendTo?: Element, // used during initial entire array rendering
): ContextItem {
  const element = document.createTextNode(empty)

  const contextItem = getNewContext(
    value,
    contexts,
    true,
    ownerSupport.context,
  )

  contextItem.withinOwnerElement = false
  contextItem.placeholder = element

  if(!appendTo) {
    contextItem.placeholder = insertBefore
  }

  domProcessContextItem(
    value,
    ownerSupport,
    contextItem,
    appendTo,
    insertBefore,
  )

  if( appendTo ) {
    paintAppends.push([paintAppend, [appendTo, element]])
  }

  return contextItem
}
