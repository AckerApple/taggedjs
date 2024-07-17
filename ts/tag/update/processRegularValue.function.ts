import { InsertBefore } from'../../interpolations/InsertBefore.type.js'
import { DisplaySubject } from '../../subject.types'
import { castTextValue, updateBeforeTemplate } from'../../updateBeforeTemplate.function.js'
import { paintContent } from '../paint.function.js'

export type RegularValue = string | number | undefined | boolean

export function processUpdateRegularValue(
  value: RegularValue,
  subject: DisplaySubject, // could be tag via subject.tag
) {
  subject.lastValue = value
  const castedValue = castTextValue(value)
  
  // replace existing string?
  const oldClone = subject.global.simpleValueElm as Text // placeholder
  paintContent.push(() => {
    oldClone.textContent = castedValue
  })
}

export function processNewRegularValue(
  value: RegularValue,
  subject: DisplaySubject, // could be tag via subject.tag
) {
  const before = subject.global.placeholder as InsertBefore // || insertBefore // Either the template is on the doc OR its the first element we last put on doc

  subject.lastValue = value
  const castedValue = castTextValue(value)
    
  // Processing of regular values
  subject.global.simpleValueElm = updateBeforeTemplate(
    castedValue,
    before, // this will be removed
  )
}
