import { Tag } from './Tag.class'
import { Counts, Template } from './interpolateTemplate'
import { TagArraySubject } from './processTagArray'
import { TagSubject } from './Tag.utils'
import { destroyTagMemory } from './destroyTag.function'

export function processTagResult(
  tag: Tag,
  subject: TagArraySubject | TagSubject | Function, // used for recording past and current value
  insertBefore: Element | Text | Template | ChildNode, // <template end interpolate />
  {
    counts, forceElement,
  }: {
    counts: Counts
    forceElement?: boolean
  },
) {
  if(!insertBefore.parentNode) {
    throw new Error('before here processTagResult')
  }

  // *if appears we already have seen
  const subjectTag = subject as TagSubject
  const existingTag = subjectTag.tag
  const previousTag = existingTag?.tagSupport.templater.global.oldest as Tag || undefined // || tag.tagSupport.oldest // subjectTag.tag
  const justUpdate = previousTag // && !forceElement
  
  if(previousTag && justUpdate) {
    /*
    const areLike = previousTag.isLikeTag(tag)

    // are we just updating an if we already had?
    if(areLike) {
      return processTagResultUpdate(tag, subjectTag, previousTag)
    }
    */
    return processTagResultUpdate(tag, subjectTag, previousTag)
  }

  if(insertBefore.nodeName !== 'TEMPLATE') {
    throw new Error(';;;;')
  }
  tag.buildBeforeElement(insertBefore, {
    counts,
    forceElement,
  })
}


function processTagResultUpdate(
  tag: Tag,
  subject: TagSubject, // used for recording past and current value
  previousTag: Tag,
) {
  // components
  if(subject instanceof Function) {
    const newTag: Tag = subject(previousTag.tagSupport)
    previousTag.updateByTag(newTag)
    subject.tag = newTag
  
    return
  }

  previousTag.updateByTag(tag)
  subject.tag = tag

  return
}