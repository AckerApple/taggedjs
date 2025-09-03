import { castTextValue } from'../../castTextValue.function.js'
import { paintBeforeText, paintCommands, paintContent, setContent } from '../../render/paint.function.js'
import { getSimpleTagVar } from '../../tagJsVars/getSimpleTagVar.function.js'
import { ContextItem } from '../ContextItem.type.js'

export type RegularValue = string | number | undefined | boolean | null

export function processUpdateRegularValue(
  value: RegularValue,
  contextItem: ContextItem, // could be tag via contextItem.tag
) {
  const castedValue = castTextValue(value)

  if(contextItem.paint) {
    // its already painting, just provide new text paint[function, [element, text]]
    contextItem.paint[1][1] = castedValue
    return
  }

  const oldClone = contextItem.simpleValueElm as Text // placeholder
  paintContent.push([setContent, [castedValue, oldClone]])
}

/** Used during updates that were another value/tag first but now simple string */
export function processNowRegularValue(
  value: RegularValue,
  contextItem: ContextItem, // could be tag via contextItem.tag
) {
  contextItem.value = value
  
  contextItem.oldTagJsVar = contextItem.tagJsVar
  contextItem.tagJsVar = getSimpleTagVar(value)

  const before = contextItem.placeholder as Text
  const castedValue = castTextValue(value)
if((value as any)?.slice && (value as string).slice(0, 3) === 'Wed') {
  console.log('will be setting simple value', {value, contextItem})
}

  const paint = contextItem.paint = [paintBeforeText, [before, castedValue, function cleanRegularValue(x: Text) {
    contextItem.simpleValueElm = x
    delete contextItem.paint
  }]]

  paintCommands.push(paint)
}
