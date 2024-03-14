import { TagSupport } from "./TagSupport.class"
import { ValueSubject } from "./ValueSubject"
import { Subject } from "./Subject"
import { Tag } from "./Tag.class"
import { TemplaterResult } from "./templater.utils"
import { bindSubjectCallback } from "./bindSubjectCallback.function"
import { Template } from "./interpolateTemplate"

export type TagSubject = Subject<TemplaterResult> & {
  tagSupport: TagSupport
  tag: Tag
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

export function setValueRedraw(
  templater: TemplaterResult, // latest tag function to call for rendering
  existing: TagSubject,
  ownerTag: Tag,
) {
  // redraw does not communicate to parent
  templater.redraw = () => {
    const existingTag = templater.oldest || existing.tag
    const tagSupport = existingTag?.tagSupport || templater.tagSupport

    const {retag} = templater.renderWithSupport(
      tagSupport,
      existingTag,
      ownerTag,
    )

    existing.set(templater)

    return retag
  }
}
