import { AnySupport, forceUpdateExistingValue, TemplateValue } from "../index.js"
import { castTextValue } from '../castTextValue.function.js'
import { paintBeforeText, paintCommands, addPaintRemover } from "../render/paint.function.js"
import { BasicTypes, ContextItem } from "../index.js"
import { processUpdateRegularValue, RegularValue } from "../tag/update/processRegularValue.function.js"
import { TagJsTag } from "./tagJsVar.type.js"
import { AttributeContextItem } from "../tag/AttributeContextItem.type.js"
import { processSimpleAttribute } from "./processSimpleAttribute.function.js"
import { blankHandler } from "../render/dom/blankHandler.function.js"

export function deleteSimpleAttribute(
  contextItem: AttributeContextItem,
) {
  const element = contextItem.target as Element
  const name = contextItem.attrName as string
  element.removeAttribute(name)
}

export function getSimpleTagVar(
  value: any,
): TagJsTag {
  return {
    tagJsType: 'simple',
    value,
    processInitAttribute: processSimpleAttribute,
    processInit: processSimpleValueInit,
    destroy: deleteSimpleValue,
    
    // TODO: get to using only checkSimpleValueChange
    hasValueChanged: checkUpdateDeleteSimpleValueChange, // For attributes, this gets switched to checkSimpleValueChange
    processUpdate: processStringUpdate, // For attributes, this gets switched to processAttributeUpdate
    // processUpdate: tagValueUpdateHandler, // For attributes, this gets switched to processAttributeUpdate
  }
}

function processStringUpdate(
  newValue: TemplateValue, // newValue
  contextItem: ContextItem,
  ownerSupport: AnySupport,
) {
  if(newValue === contextItem.value) {
    return 0
  }

  return forceUpdateExistingValue(
    contextItem,
    newValue,
    ownerSupport,
  )
}

function processSimpleValueInit(
  value: any, // TemplateValue | StringTag | SubscribeValue | SignalObject,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  insertBefore?: Text,
  _appendTo?: Element,
) {
  const castedValue = castTextValue(value)

  insertBefore = contextItem.placeholder as Text

  // always insertBefore for content
  const paint = contextItem.paint = [paintBeforeText, [insertBefore, castedValue, function afterSimpleValue(x: Text) {
    contextItem.simpleValueElm = x
    delete contextItem.paint
  }, 'processSimpleValueInit']]
  paintCommands.push(paint)
}

export function deleteSimpleValue(
  context: ContextItem,
) {
  if(!context.simpleValueElm && context.paint) {
    context.paint[0] = blankHandler
    return // I'm being deleted before my first render even occurred
  }

  const elm = context.simpleValueElm as Element
  delete context.simpleValueElm
  addPaintRemover(elm, 'deleteSimpleValue')
}

export function checkSimpleValueChange(
  newValue: unknown,
  contextItem: ContextItem,
) {
  const isBadValue = newValue === null || newValue === undefined
  const isRegularUpdate = isBadValue || newValue === contextItem.value // !(typeof(newValue) === BasicTypes.object)
  if(isRegularUpdate) {
    return 0  // no need to destroy, just update display
  }
  
  return 6 // 'changed-simple-value'
}

export function checkUpdateDeleteSimpleValueChange(
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

    return 0  // no need to destroy, just update display
  }

  deleteSimpleValue(contextItem)
  
  return 6 // 'changed-simple-value'
}
