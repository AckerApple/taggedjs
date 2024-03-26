import { DisplaySubject } from './Tag.utils'
import { Template, updateBetweenTemplates } from './interpolateTemplate'

export type RegularValue = string | number | undefined | boolean

export function processRegularValue(
  value: RegularValue,
  subject: DisplaySubject, // could be tag via subject.tag
  template: Element | Text | Template, // <template end interpolate /> (will be removed)
) {
  subject.template = template
  const before = subject.clone || template // Either the template is on the doc OR its the first element we last put on doc

  subject.lastValue = value
  
  // Processing of regular values
  const clone = updateBetweenTemplates(
    value,
    before, // this will be removed
  )

  subject.clone = clone // remember single element put down, for future updates

  return []
}
