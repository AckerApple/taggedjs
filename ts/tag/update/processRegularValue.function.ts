import { castTextValue } from'../../castTextValue.function.js'
import { paintBeforeText, paintCommands, setContent } from '../../render/paint.function.js'
import { ContextItem } from '../Context.types.js'
import { checkSimpleValueChange, deleteSimpleValue } from '../checkSimpleValueChange.function.js'

export type RegularValue = string | number | undefined | boolean | null

export function processUpdateRegularValue(
  value: RegularValue,
  contextItem: ContextItem, // could be tag via contextItem.tag
) {
  const castedValue = castTextValue(value)

  if(contextItem.paint) {
    // its already painting, just provide new text
    contextItem.paint.args[1] = castedValue
    return
  }

  const oldClone = contextItem.simpleValueElm as Text // placeholder
  setContent.push([castedValue, oldClone])
}

/** Used during updates that were another value/tag first but now simple string */
export function processNowRegularValue(
  value: RegularValue,
  subject: ContextItem, // could be tag via subject.tag
) {
  subject.checkValueChange = checkSimpleValueChange
  subject.delete = deleteSimpleValue
  const before = subject.placeholder as Text
  const castedValue = castTextValue(value)

  const paint = subject.paint = {
    processor: paintBeforeText,
    args: [before, castedValue, (x: Text) => {
      subject.simpleValueElm = x
      subject.simpleValueElm = x
      delete subject.paint
    }],
  }

  paintCommands.push(paint)
}
