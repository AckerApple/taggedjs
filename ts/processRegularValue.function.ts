import { InsertBefore } from './Clones.type'
import { DisplaySubject } from './subject.types'
import { updateBeforeTemplate } from './updateBeforeTemplate.function'

export type RegularValue = string | number | undefined | boolean

export function processRegularValue(
  value: RegularValue,
  subject: DisplaySubject, // could be tag via subject.tag
  insertBefore: InsertBefore, // <template end interpolate /> (will be removed)
) {
  subject.insertBefore = insertBefore
  const before = subject.clone || insertBefore // Either the template is on the doc OR its the first element we last put on doc

  // matches but also was defined at some point
  if(subject.lastValue === value && 'lastValue' in subject) {
    return // no need to update display, its the same
  }

  subject.lastValue = value
  
  // Processing of regular values
  const clone = updateBeforeTemplate(
    value,
    before, // this will be removed
  )

  subject.clone = clone // remember single element put down, for future updates
}
