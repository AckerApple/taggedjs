import { castTextValue, updateBeforeTemplate } from'../../updateBeforeTemplate.function.js'
import { setContent } from '../paint.function.js'
import { ContextItem } from '../Context.types.js'
import { checkSimpleValueChange } from '../checkDestroyPrevious.function.js'

export type RegularValue = string | number | undefined | boolean

export function processUpdateRegularValue(
  value: RegularValue,
  contextItem: ContextItem, // could be tag via contextItem.tag
) {
  const castedValue = castTextValue(value)
  const oldClone = contextItem.simpleValueElm as Text // placeholder
  setContent.push([castedValue, oldClone])
}

/** Used during updates that were another value/tag first but now simple string */
export function processNowRegularValue(
  value: RegularValue,
  subject: ContextItem, // could be tag via subject.tag
) {
  subject.checkValueChange = checkSimpleValueChange
  const before = subject.placeholder as Text
  const castedValue = castTextValue(value)

  // Processing of regular values
  subject.simpleValueElm = updateBeforeTemplate(
    castedValue,
    before,
  )
}
