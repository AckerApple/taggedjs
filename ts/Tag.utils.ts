import { TagSupport } from "./TagSupport.class.js"
import { ValueSubject } from "./ValueSubject.js"
import { Subject } from "./Subject.js"
import { Tag } from "./Tag.class.js"
import { redrawTag } from "./redrawTag.function.js"
import { TemplaterResult } from "./templater.utils.js"
import { bindSubjectCallback } from "./bindSubjectCallback.function.js"
import { Template } from "./interpolateTemplate.js"

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
    const existingTag = existing.tag    
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
