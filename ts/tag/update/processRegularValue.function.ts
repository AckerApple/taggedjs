import { castTextValue, updateBeforeTemplate } from'../../updateBeforeTemplate.function.js'
import { paintContent } from '../paint.function.js'
import { ContextItem } from '../Tag.class.js'

export type RegularValue = string | number | undefined | boolean

export function processUpdateRegularValue(
  value: RegularValue,
  subject: ContextItem, // could be tag via subject.tag
) {
  const castedValue = castTextValue(value)
  
  // replace existing string?
  const oldClone = subject.global.simpleValueElm as Text // placeholder
  paintContent.push(function paintContentPush() {
    oldClone.textContent = castedValue
  })
}

export function processNewRegularValue(
  value: RegularValue,
  subject: ContextItem, // could be tag via subject.tag
) {
  const before = subject.global.placeholder as Text
  const castedValue = castTextValue(value)

  // Processing of regular values
  subject.global.simpleValueElm = updateBeforeTemplate(
    castedValue,
    before,
  )
}
