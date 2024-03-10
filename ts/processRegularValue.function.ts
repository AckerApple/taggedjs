import { DisplaySubject } from "./Tag.utils"
import { Template, updateBetweenTemplates } from "./interpolateTemplate.js"

export type RegularValue = string | number | undefined | boolean

export function processRegularValue(
  value: RegularValue,
  result: DisplaySubject, // could be tag via result.tag
  template: Element | Text | Template, // <template end interpolate /> (will be removed)
) {
  result.template = template

  const before = result.clone || template // Either the template is on the doc OR its the first element we last put on doc

  result.lastValue = value
  
  // Processing of regular values
  const clone = updateBetweenTemplates(
    value,
    before, // this will be removed
  )

  result.clone = clone // remember single element put down, for future updates

  return []
}
