import { StringTag, DomTag } from '../Tag.class.js'
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
    case ValueTypes.stateRender:
    case ValueTypes.tagComponent:
      return new TagJsSubject(value, valueType) // ownerSupport.global.value

    case ValueTypes.templater:
      const templater = value as TemplaterResult
      const tag = templater.tag as StringTag | DomTag
      const subject = processNewTag(tag, ownerSupport)
      subject.global.nowValueType = valueType
      return subject
    
    case ValueTypes.tag:
    case ValueTypes.dom:
      const htmlSubject = processNewTag(value as StringTag | DomTag, ownerSupport)
      htmlSubject.global.nowValueType = valueType
      return htmlSubject

    case ValueTypes.subject:
      const newGlobal = getNewGlobal()
      ;(value as any).global = newGlobal
      return value as InterpolateSubject
  }

  const subject = new TagJsSubject(value, valueType) as unknown as DisplaySubject
  return subject
}

function processNewTag(
  value: StringTag | DomTag,
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
