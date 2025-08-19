// taggedjs-no-compile

import { paintAppend, paintAppends, paintBefore, paintCommands } from '../../render/paint.function.js'
import { AnySupport } from '../index.js'
import { domProcessContextItem } from '../../interpolations/optimizers/domProcessContextItem.function.js'
import { empty } from '../ValueTypes.enum.js'
import { TemplateValue } from '../TemplateValue.type.js'
import { valueToTagJsVar } from '../../tagJsVars/valueToTagJsVar.function.js'
import { ContextItem } from '../ContextItem.type.js'
import { Subject } from '../../subject/Subject.class.js'

/** Used by arrays and subcontext creators like subscribe. Must provide insertBefore OR appendTo */
export function createAndProcessContextItem(
  value: TemplateValue,
  ownerSupport: AnySupport,
  contexts: ContextItem[],
  insertBefore?: Text, // used during updates
  appendTo?: Element, // used during initial entire array rendering
): ContextItem {
  const element = document.createTextNode(empty)
  const contextItem: ContextItem = {
    value,
    tagJsVar: valueToTagJsVar(value),
    withinOwnerElement: false,
    placeholder: element,
    destroy$: new Subject(),
    // TODO: This will need to be passed in
    parentContext: ownerSupport.context,
    
    valueIndex: contexts.length,
  }

  if(!appendTo) {
    paintCommands.push([paintBefore, [insertBefore, element]])
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
