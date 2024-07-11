import { TagArraySubject, processTagArray } from './processTagArray.js'
import { TemplaterResult, Wrapper } from '../TemplaterResult.class.js'
import { InsertBefore } from '../../interpolations/InsertBefore.type.js'
import { DisplaySubject, TagSubject } from '../../subject.types.js'
import { RegularValue } from './processRegularValue.function.js'
import { processTag, tagFakeTemplater } from './processTag.function.js'
import { AnySupport } from '../Support.class.js'
import { StringTag, DomTag, ContextItem } from '../Tag.class.js'
import { TemplateValue, processOptions } from './processFirstSubject.utils.js'
import { renderTagOnly } from '../render/renderTagOnly.function.js'
import { BasicTypes, ValueTypes } from '../ValueTypes.enum.js'
import { oneRenderToSupport } from './oneRenderToSupport.function.js'
import { getValueType } from '../getValueType.function.js'
import { castTextValue, updateBeforeTemplate } from '../../updateBeforeTemplate.function.js'
import { processFirstSubjectComponent } from './processFirstSubjectComponent.function.js'

export function processFirstSubjectValue(
  value: TemplateValue | StringTag,
  subject: ContextItem, // could be tag via result.tag
  ownerSupport: AnySupport, // owning support
  options: processOptions, // {added:0, removed:0}
  fragment?: DocumentFragment | Element
): {
  support?: AnySupport
  fragment?: DocumentFragment | Element
} {
  const valueType = getValueType(value)

  switch (valueType) {
    case ValueTypes.subject: {
      return {fragment}// its managed on its own
    }
    
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
        ownerSupport,
        options,
        fragment,
      )
      return {fragment: result}
    
    case ValueTypes.stateRender:
    case ValueTypes.tagComponent:
      const processResult = processFirstSubjectComponent(
        value as TemplaterResult,
        subject as TagSubject,
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

  processFirstRegularValue(
    value as RegularValue,
    subject as DisplaySubject,
    subject.global.placeholder as InsertBefore, // || insertBefore,
  )

  return {fragment}
}

function processFirstRegularValue(
  value: RegularValue,
  subject: DisplaySubject, // could be tag via subject.tag
  insertBefore: InsertBefore, // <template end interpolate /> (will be removed)
) {
  subject.lastValue = value
  const castedValue = castTextValue(value)

  // Processing of regular values
  const clone = updateBeforeTemplate(
    castedValue,
    insertBefore, // this will be removed
  )

  subject.global.simpleValueElm = clone
}
