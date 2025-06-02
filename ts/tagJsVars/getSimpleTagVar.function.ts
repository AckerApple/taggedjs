import { AnySupport, ContextItem, TagCounts } from "../index.js"
import { castTextValue } from '../castTextValue.function.js'
import { paintBeforeText, paintCommands, paintRemover } from "../render/paint.function.js"
import { checkSimpleValueChange } from "./checkSimpleValueChange.function.js"

export function getSimpleTagVar(
  value: any,
) {
  return {
    tagJsType: 'simple',
    value,
    processInit: processSimpleValueInit,
    checkValueChange: checkSimpleValueChange,
    delete: deleteSimpleValue,
  }
}

function processSimpleValueInit(
  value: any, // TemplateValue | StringTag | SubscribeValue | SignalObject,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  counts: TagCounts,
  appendTo?: Element,      
  insertBefore?: Text,
) {
  // value = value.value
  const castedValue = castTextValue(value)

  insertBefore = contextItem.placeholder as Text

  // always insertBefore for content
  const paint = contextItem.paint = [paintBeforeText, [insertBefore, castedValue, function afterSimpleValue(x: Text) {
    contextItem.simpleValueElm = x
    delete contextItem.paint
  }]]
  paintCommands.push(paint)
}

export function deleteSimpleValue(
  contextItem: ContextItem,
) {
  const elm = contextItem.simpleValueElm as Element
  
  delete contextItem.simpleValueElm
  delete contextItem.tagJsVar

  // is it being destroyed before it was even built?
  if(contextItem.paint !== undefined) {
    const paintIndex = paintCommands.findIndex(paint => paint === contextItem.paint)
    paintCommands.splice(paintIndex, 1)
    return
  }

  paintCommands.push([paintRemover, [elm]])
}
