import { InsertBefore } from "./Clones.type"
import { Tag } from "./Tag.class"
import { TemplaterResult } from "./TemplaterResult.class"
import { bindSubjectCallback } from "./bindSubjectCallback.function"
import { Template } from "./interpolateTemplate"
import { Subject } from "./subject/Subject.class"
import { ValueSubject } from "./subject/ValueSubject"

export type TagSubject = Subject<TemplaterResult> & {
  tag?: Tag //  consider renaming to latestTag
  // insertBefore?: Element | Text | Template | ChildNode
}

type RegularValue = string | number | boolean
export type DisplaySubject = Subject<RegularValue> & {
  lastValue?: RegularValue
  clone?: Element | Text | Template
  insertBefore: InsertBefore
}

export function getSubjectFunction(
  value: any,
  tag: Tag,
) {
  return new ValueSubject( bindSubjectCallback(value, tag) )
}
