import { castTextValue, updateBeforeTemplate } from'../../updateBeforeTemplate.function.js'
import { setContent } from '../paint.function.js'
import { ContextItem } from '../Context.types.js'
import { checkSimpleValueChange } from '../checkDestroyPrevious.function.js'

export type RegularValue = string | number | undefined | boolean

export function processUpdateRegularValue(
  value: RegularValue,
  subject: ContextItem, // could be tag via subject.tag
) {
  const castedValue = castTextValue(value)
  const oldClone = subject.simpleValueElm as Text // placeholder
  setContent.push([castedValue, oldClone])
}

export function processNewRegularValue(
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
