import { Tag } from "./Tag.class.js"
import { Clones } from "./Clones.type.js"
import { Counts } from "./interpolateTemplate.js"
import { TagArraySubject } from "./processTagArray.js"
import { TagSubject } from "./Tag.utils.js"

export function processTagResult(
  tag: Tag,
  result: TagArraySubject | TagSubject | Function, // used for recording past and current value
  insertBefore: Element, // <template end interpolate />
  {
    counts, forceElement,
  }: {
    counts: Counts
    forceElement?: boolean
  }
): Clones {
  // *if appears we already have seen
  const subjectTag = result as TagSubject
  const rTag = subjectTag.tag
  if(rTag && !forceElement) {
    // are we just updating an if we already had?
    if(rTag.isLikeTag(tag)) {
      // components
      if(result instanceof Function) {
        const newTag = result(rTag.tagSupport)
        rTag.updateByTag(newTag)
        return []
      }

      rTag.updateByTag(tag)
      
      return [] // no clones created in element already on stage
    }    
  }

  const clones = tag.buildBeforeElement(insertBefore, {
    counts,
    forceElement,
  })
  subjectTag.tag = tag // let reprocessing know we saw this previously as an if

  return clones
}
