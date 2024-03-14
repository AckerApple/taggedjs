import { Tag } from './Tag.class'
import { Clones } from './Clones.type'
import { Counts, Template } from './interpolateTemplate'
import { TagArraySubject } from './processTagArray'
import { TagSubject } from './Tag.utils'

export function processTagResult(
  tag: Tag,
  result: TagArraySubject | TagSubject | Function, // used for recording past and current value
  insertBefore: Element | Text | Template, // <template end interpolate />
  {
    counts, forceElement,
  }: {
    counts: Counts
    forceElement?: boolean
  }
) {
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
        return
      }

      rTag.updateByTag(tag)
      return
    }    
  }

  tag.buildBeforeElement(insertBefore, {
    counts,
    forceElement,
  })
  subjectTag.tag = subjectTag.tag || tag // let reprocessing know we saw this previously as an if
}
