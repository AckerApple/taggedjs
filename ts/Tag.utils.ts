import { TagSupport } from "./getTagSupport.js"
import { ValueSubject } from "./ValueSubject.js"
import { Subject } from "./Subject.js"
import { Tag } from "./Tag.class.js"
import { redrawTag } from "./redrawTag.function.js"
import { TemplaterResult } from "./templater.utils.js"
import { bindSubjectCallback } from "./bindSubjectCallback.function.js"

export type TagSubject = Subject<TemplaterResult> & {tagSupport: TagSupport, tag: Tag}

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
  templater.redraw = (
    force?: boolean // forces redraw on children
  ) => {
    const existingTag: Tag | undefined = existing.tag
    const {remit, retag} = redrawTag(existingTag, templater, ownerTag)

    existing.tagSupport = retag.tagSupport

    if(!remit) {
      return
    }

    existing.set(templater)

    if(force) {
      const context = existingTag.tagSupport.memory.context
      Object.values(context).forEach((item: any) => {
        if(!item.value?.isTemplater) {
          return
        }

        item.value.redraw()
      })
    }

    return retag
  }
}
