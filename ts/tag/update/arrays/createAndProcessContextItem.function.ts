// taggedjs-no-compile

import { PaintCommand, paintAppends, paintCommands } from '../../../render/paint.function.js'
import { AnySupport } from '../../index.js'
import { domProcessContextItem } from '../../../interpolations/optimizers/domProcessContextItem.function.js'
import { empty } from '../../ValueTypes.enum.js'
import { TemplateValue } from '../../TemplateValue.type.js'
import { ContextItem } from '../../ContextItem.type.js'
import { getNewContext } from '../../../render/addOneContext.function.js'

/** Used by arrays and subcontext creators like subscribe. Must provide insertBefore OR appendTo */
export function createAndProcessContextItem(
  value: TemplateValue,
  ownerSupport: AnySupport,
  contexts: ContextItem[],
  insertBefore?: Text, // used during updates
  appendTo?: Element, // used during initial entire array rendering
): ContextItem {
  const startMarker = document.createTextNode(empty)
  const endMarker = document.createTextNode(empty)

  const contextItem = getNewContext(
    value,
    contexts,
    true,
    ownerSupport.context,
  )

  contextItem.withinOwnerElement = false
  contextItem.arrayStartMarker = startMarker
  contextItem.placeholder = endMarker

  if(appendTo) {
    paintAppends.push([
      paintArrayMarkerAppend,
      [appendTo, startMarker, contextItem],
    ])
  } else {
    const startCommand: PaintCommand = [
      paintArrayMarkerBefore,
      [insertBefore, startMarker, contextItem],
    ]
    const endCommand: PaintCommand = [
      paintArrayMarkerBefore,
      [insertBefore, endMarker, contextItem],
    ]
    paintCommands.push(startCommand, endCommand)
  }

  domProcessContextItem(
    value,
    ownerSupport,
    contextItem,
    appendTo,
    endMarker,
  )

  if( appendTo ) {
    paintAppends.push([
      paintArrayMarkerAppend,
      [appendTo, endMarker, contextItem],
    ])
  }

  return contextItem
}

function paintArrayMarkerAppend(
  appendTo: ParentNode,
  marker: Text,
  context: ContextItem,
) {
  if(!context.arrayMarkersDeleted) {
    appendTo.appendChild(marker)
  }
}

function paintArrayMarkerBefore(
  insertBefore: Text | Element,
  marker: Text,
  context: ContextItem,
) {
  if(context.arrayMarkersDeleted) {
    return
  }

  const parentNode = insertBefore.parentNode as ParentNode
  parentNode.insertBefore(marker, insertBefore)
}
