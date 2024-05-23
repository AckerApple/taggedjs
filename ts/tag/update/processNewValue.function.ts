import { Tag } from '../Tag.class'
import { DisplaySubject, TagSubject } from '../../subject.types'
import { ValueSubject } from '../../subject/ValueSubject'
import { TemplaterResult } from '../../TemplaterResult.class'
import { TagSupport } from '../TagSupport.class'
import { InterpolateSubject, TemplateValue, ValueTypes, getValueType } from './processFirstSubject.utils'

export function processNewValue(
  value: TemplateValue,
  ownerSupport: TagSupport,
): InterpolateSubject {
  const valueType = getValueType(value)
  switch (valueType) {
    case ValueTypes.tagComponent:
      const tagSubject = new ValueSubject(value) as TagSubject
      return tagSubject

    case ValueTypes.templater:
      const templater = value as TemplaterResult
      const tag = templater.tag as Tag
      return processNewTag(tag, ownerSupport)
    
    case ValueTypes.tag:
      return processNewTag(value as Tag, ownerSupport)

    case ValueTypes.subject:
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

  subject.tagSupport = new TagSupport(
    templater,
    ownerSupport,
    subject
  )

  return subject
}
