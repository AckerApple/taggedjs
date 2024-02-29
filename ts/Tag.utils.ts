import { TagSupport } from "./TagSupport.class.js"
import { ValueSubject } from "./ValueSubject.js"
import { Subject } from "./Subject.js"
import { Tag } from "./Tag.class.js"
import { redrawTag } from "./redrawTag.function.js"
import { TemplaterResult } from "./templater.utils.js"
import { bindSubjectCallback } from "./bindSubjectCallback.function.js"

export type TagSubject = Subject<TemplaterResult> & {
  tagSupport: TagSupport
  tag: Tag
  template: Element
}

export type DisplaySubject = Subject<TemplaterResult> & {
  clone?: Element | Text
  template: Element
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
    const newest = templater.tagSupport.newest
    const tagSupport = existingTag?.tagSupport || templater.tagSupport

    const {remit, retag} = redrawTag(
      tagSupport,
      templater,
      newest,
      ownerTag
    )
    
    if(!remit) {
      return
    }

    existing.set(templater)

    return retag
  }
}
