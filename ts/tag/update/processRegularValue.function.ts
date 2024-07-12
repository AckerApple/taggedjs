import { InsertBefore } from'../../interpolations/InsertBefore.type.js'
import { DisplaySubject } from '../../subject.types'
import { castTextValue, updateBeforeTemplate } from'../../updateBeforeTemplate.function.js'
import { paintContent } from '../paint.function.js'

export type RegularValue = string | number | undefined | boolean

/** Used during update value process */
export function processRegularValue(
  value: RegularValue,
  subject: DisplaySubject, // could be tag via subject.tag
) {
  const before = subject.global.placeholder as InsertBefore // || insertBefore // Either the template is on the doc OR its the first element we last put on doc

  // matches but also was defined at some point
  const skip = subject.lastValue === value && 'lastValue' in subject
  if(skip) {
    return // no need to update display, its the same
  }

  subject.lastValue = value
  const castedValue = castTextValue(value)
  
  // replace existing string?
  const oldClone = subject.global.simpleValueElm // placeholder
  if(oldClone) {
    paintContent.push(() => {
      oldClone.textContent = castedValue
    })
    return
  }
  
  // Processing of regular values
  subject.global.simpleValueElm = updateBeforeTemplate(
    castedValue,
    before, // this will be removed
  )
}
