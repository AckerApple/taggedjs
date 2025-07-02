import { AnySupport, TagCounts } from "../index.js"
import { castTextValue } from '../castTextValue.function.js'
import { paintBeforeText, paintCommands, addPaintRemover } from "../render/paint.function.js"
import { BasicTypes, ContextItem } from "../index.js"
import { processUpdateRegularValue, RegularValue } from "../tag/update/processRegularValue.function.js"
import { TagJsTag } from "./tagJsVar.type.js"
import { tagValueUpdateHandler } from "../tag/update/tagValueUpdateHandler.function.js"

export function getSimpleTagVar(
  value: any,
): TagJsTag {
  return {
    tagJsType: 'simple',
    value,
    processInit: processSimpleValueInit,
    delete: deleteSimpleValue,
    
    // TODO: get down to only one
    checkValueChange: checkSimpleValueChange,
    processUpdate: tagValueUpdateHandler,
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
  addPaintRemover(elm)
}


export function checkSimpleValueChange(
  newValue: unknown,
  contextItem: ContextItem,
) {
  const isBadValue = newValue === null || newValue === undefined
  const isRegularUpdate = isBadValue || !(typeof(newValue) === BasicTypes.object)
  if(isRegularUpdate) {
    // This will cause all other values to render
    processUpdateRegularValue(
      newValue as RegularValue,
      contextItem,
    )

    return -1  // no need to destroy, just update display
  }

  deleteSimpleValue(contextItem)
  
  return 6 // 'changed-simple-value'
}
