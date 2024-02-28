import { TagSupport } from "./TagSupport.class.js"
import { ValueSubject } from "./ValueSubject.js"
import { Subject } from "./Subject.js"
import { Tag } from "./Tag.class.js"
import { redrawTag } from "./redrawTag.function.js"
import { TemplaterResult } from "./templater.utils.js"
import { bindSubjectCallback } from "./bindSubjectCallback.function.js"

export type TagSubject = Subject<TemplaterResult> & {
  tagSupport?: TagSupport
  tag?: Tag
  clone?: Element
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
    /*
    if(!existing.tag) {
      throw new Error('no tag on redraw')
    }
    */

    const existingTag = existing.tag
    // const tagSupport = existingTag?.tagSupport || new TagSupport(templater, templater.tagSupport.children)
    // const tagSupport = templater.tagSupport
    
    const newest = templater.tagSupport.newest
    // const oldest = templater.tagSupport.oldest
    
    // const tagSupport = oldest?.tagSupport || templater.tagSupport
    /*
    if(!existingTag) {
      throw new Error('bad redraw')
    }
    */
    const tagSupport = existingTag?.tagSupport || templater.tagSupport

    /*
    if(Object.keys(tagSupport.memory.context).length === 0) {
      throw new Error('yo issue here')
    }
    */

    const {remit, retag} = redrawTag(
      tagSupport,
      templater,
      newest, // existingTag,
      // existingTag,
      ownerTag
    )

    // ???
    // existing.tagSupport = retag.tagSupport
    
    if(!remit) {
      return
    }

    existing.set(templater)

    return retag
  }
}
