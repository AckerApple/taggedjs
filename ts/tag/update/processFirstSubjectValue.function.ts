import { processSubjectComponent } from './processSubjectComponent.function.js'
import { TagArraySubject, processTagArray } from './processTagArray.js'
import { TemplaterResult, Wrapper } from '../TemplaterResult.class.js'
import { InsertBefore } from '../../interpolations/InsertBefore.type.js'
import { DisplaySubject, TagSubject } from '../../subject.types.js'
import { RegularValue, processFirstRegularValue } from './processRegularValue.function.js'
import { processTag, tagFakeTemplater } from './processTag.function.js'
import { AnySupport } from '../Support.class.js'
import { StringTag, DomTag } from '../Tag.class.js'
import { InterpolateSubject, TemplateValue, processOptions } from './processFirstSubject.utils.js'
import { renderTagOnly } from '../render/renderTagOnly.function.js'
import { BasicTypes, ValueTypes } from '../ValueTypes.enum.js'
import { oneRenderToSupport } from './oneRenderToSupport.function.js'
import { getValueType } from '../getValueType.function.js'

export function processFirstSubjectValue(
  value: TemplateValue | StringTag,
  subject: InterpolateSubject, // could be tag via result.tag
  insertBefore: InsertBefore, // <template end interpolate /> (will be removed)
  ownerSupport: AnySupport, // owning support
  options: processOptions, // {added:0, removed:0}
  fragment?: DocumentFragment
): {support?: AnySupport, fragment?: DocumentFragment} {
  const valueType = getValueType(value)
  
  switch (valueType) {
    case ValueTypes.templater:
      return processTag(
        value as TemplaterResult,
        ownerSupport,
        subject as TagSubject,
      )

    case ValueTypes.dom:
    case ValueTypes.tag:
      const tag = value as StringTag | DomTag
      let templater = tag.templater

      if(!templater) {
        templater = tagFakeTemplater(tag)
      }

      return processTag(
        templater,
        ownerSupport,
        subject as TagSubject,
      )
  
    case ValueTypes.tagArray:
      const result = processTagArray(
        subject as TagArraySubject,
        value as (StringTag | TemplaterResult)[],
        insertBefore,
        ownerSupport,
        options,
        fragment,
      )
      return {fragment: result}
    
    case ValueTypes.stateRender:
    case ValueTypes.tagComponent:
      const processResult = processSubjectComponent(
        value as TemplaterResult,
        subject as TagSubject,
        insertBefore,
        ownerSupport,
        options,
      )
      return {support: processResult, fragment}
    
    case BasicTypes.function:
    case ValueTypes.oneRender:
      const v = value as Wrapper
      if(valueType === ValueTypes.oneRender) {
        const support = oneRenderToSupport(
          v,
          subject as TagSubject,
          ownerSupport,
        )
        
        renderTagOnly(support, support, subject as TagSubject, ownerSupport)
        
        return processTag(
          support.templater,
          ownerSupport,
          subject as TagSubject,
        )
      }
      break
  }

  const result = processFirstRegularValue(
    value as RegularValue,
    subject as DisplaySubject,
    subject.global.placeholder || insertBefore,
  )

  return {fragment}
}
