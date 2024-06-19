import { Tag, Dom } from '../Tag.class.js'
import { DisplaySubject, TagSubject } from '../../subject.types.js'
import { ValueSubject } from '../../subject/ValueSubject.js'
import { TemplaterResult } from '../TemplaterResult.class.js'
import { Support } from '../Support.class.js'
import { InterpolateSubject, TemplateValue } from './processFirstSubject.utils.js'
import { ValueTypes } from '../ValueTypes.enum.js'
import { getValueType } from '../getValueType.function.js'
import { TagJsSubject, getNewGlobal } from './TagJsSubject.class.js'

export function processNewValue(
  value: TemplateValue | ValueSubject<any>,
  ownerSupport: Support,
): InterpolateSubject {
  const valueType = getValueType(value)
  switch (valueType) {
    case ValueTypes.tagComponent:
      return new TagJsSubject(value) // ownerSupport.global.value

    case ValueTypes.templater:
      const templater = value as TemplaterResult
      const tag = templater.tag as Tag | Dom
      return processNewTag(tag, ownerSupport)
    
    case ValueTypes.tag:
    case ValueTypes.dom:
      return processNewTag(value as Tag | Dom, ownerSupport)

    case ValueTypes.subject:
      (value as any).global = getNewGlobal()
      return value as InterpolateSubject
  }

  return new TagJsSubject(value) as unknown as DisplaySubject
}

function processNewTag(
  value: Tag | Dom,
  ownerSupport: Support
) {  
  const tag = value
  
  let templater = tag.templater
  // TODO: Can this ever happen?
  if(!templater) {
    templater = new TemplaterResult([])
    templater.tag = tag
    tag.templater = templater
  }

  const subject = new TagJsSubject(templater) as any as TagSubject
  subject.support = new Support(
    templater,
    ownerSupport,
    subject
  )

  subject.global.oldest = subject.support
  ownerSupport.subject.global.childTags.push(subject.support as Support)

  return subject
}
