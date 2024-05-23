import { Tag } from '../Tag.class'
import { DisplaySubject, TagSubject } from '../../subject.types'
import { ValueSubject } from '../../subject/ValueSubject'
import { isSubjectInstance, isTagClass, isTagComponent, isTagTemplater } from '../../isInstance'
import { TemplaterResult } from '../../TemplaterResult.class'
import { TagSupport } from '../TagSupport.class'
import { InterpolateSubject, TemplateValue } from './processFirstSubject.utils'
import { Callback } from '../../interpolations/bindSubjectCallback.function'

export function processNewValue(
  hasValue: boolean,
  value: TemplateValue,
  ownerSupport: TagSupport,
): InterpolateSubject {
  if(isTagComponent(value)) {
    const tagSubject = new ValueSubject(value) as TagSubject
    return tagSubject
  }

  if(value instanceof Function) {
    return new ValueSubject<Callback>(value)
  }

  if(!hasValue) {
    return new ValueSubject<undefined>(undefined)
  }

  if(isTagTemplater(value)) {
    const templater = value as TemplaterResult
    const tag = templater.tag as Tag
    return processNewTag(tag, ownerSupport)
  }

  if(isTagClass(value)) {
    return processNewTag(value as Tag, ownerSupport)
  }

  // is already a value subject?
  if(isSubjectInstance(value)) {
    return value as ValueSubject<any>
  }

  return new ValueSubject(value) as unknown as DisplaySubject
}

function processNewTag(
  value: Tag,
  ownerSupport: TagSupport
) {  
  const tag = value as Tag
  
  let templater = tag.templater
  if(!templater) {
    templater = new TemplaterResult([])
    templater.tag = tag
    tag.templater = templater
  }

  const subject = new ValueSubject(templater) as TagSubject

  const tagSupport = subject.tagSupport = new TagSupport(
    templater,
    ownerSupport,
    subject
  )

  return subject
}
