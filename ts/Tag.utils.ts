import { ValueSubject } from "./ValueSubject"
import { Subject } from "./Subject"
import { Tag } from "./Tag.class"
import { TemplaterResult, renderWithSupport } from "./TemplaterResult.class"
import { bindSubjectCallback } from "./bindSubjectCallback.function"
import { Template } from "./interpolateTemplate"

export type TagSubject = Subject<TemplaterResult> & {
  tag: Tag //  consider renaming to latestTag
  template: Element | Text | Template
}

type RegularValue = string | number | boolean
export type DisplaySubject = Subject<RegularValue> & {
  lastValue?: RegularValue
  clone?: Element | Text | Template
  template: Element | Text | Template
}

export function getSubjectFunction(
  value: any,
  tag: Tag,
) {
  return new ValueSubject( bindSubjectCallback(value, tag) )
}
