import { Tag } from './Tag.class.js'
import { isSubjectInstance, isTagArray } from '../isInstance.js'
import { ValueSubject } from '../subject/ValueSubject.js'
import { TagChildrenInput } from './tag.utils.js'
import { TemplaterResult } from './TemplaterResult.class.js'

export function kidsToTagArraySubject(
  children: TagChildrenInput | undefined,
  templaterResult: TemplaterResult,
): ValueSubject<Tag[]> {
  if(isSubjectInstance(children)) {
    return children as ValueSubject<Tag[]>
  }
  
  const kidArray = children as Tag[]
  if(isTagArray(kidArray)) {
    templaterResult.madeChildIntoSubject = true // was converted into a subject
    return new ValueSubject(children as Tag[])
  }

  const kid = children as Tag
  if(kid) {
    templaterResult.madeChildIntoSubject = true // was converted into a subject
    kid.memory.arrayValue = 0
    return new ValueSubject([kid])
  }

  templaterResult.madeChildIntoSubject = true // was converted into a subject
  return new ValueSubject<Tag[]>([])
}
