import { processTagArray } from './processTagArray.js'
import { TemplaterResult, Wrapper } from '../TemplaterResult.class.js'
import { RegularValue } from './processRegularValue.function.js'
import { newSupportByTemplater, processNewTag, processTag, tagFakeTemplater } from './processTag.function.js'
import { AnySupport } from '../Support.class.js'
import { StringTag, DomTag, ContextItem } from '../Tag.class.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { renderTagOnly } from '../render/renderTagOnly.function.js'
import { BasicTypes, ValueTypes } from '../ValueTypes.enum.js'
import { oneRenderToSupport } from './oneRenderToSupport.function.js'
import { getValueType } from '../getValueType.function.js'
import { castTextValue, updateBeforeTemplate } from '../../updateBeforeTemplate.function.js'
import { processFirstSubjectComponent, processReplacementComponent } from './processFirstSubjectComponent.function.js'
import { Counts } from '../../interpolations/interpolateTemplate.js'

export function processFirstSubjectValue(
  value: TemplateValue | StringTag,
  subject: ContextItem, // could be tag via result.tag
  ownerSupport: AnySupport, // owning support
  counts: Counts, // {added:0, removed:0}
  appendTo?: Element,
): AnySupport | undefined {
  const valueType = subject.global.nowValueType = getValueType(value)

  switch (valueType) {
    case ValueTypes.subject: {
      return
    }
    
    case ValueTypes.templater:
      if(appendTo) {
        return processNewTag(
          value as TemplaterResult,
          ownerSupport,
          subject,
          appendTo,
        )
      }
      
      return processTag(
        ownerSupport,
        subject,
      )

    case ValueTypes.dom:
    case ValueTypes.tag:
      const tag = value as StringTag | DomTag
      let templater = tag.templater

      if(!templater) {
        templater = tagFakeTemplater(tag)
      }

      if(appendTo) {
        return processNewTag(
          templater,
          ownerSupport,
          subject as ContextItem,
          appendTo,
        )
      }

      subject.global.newest = newSupportByTemplater(templater, ownerSupport, subject)

      return processTag(
        ownerSupport,
        subject,
      )
  
    case ValueTypes.tagArray:
      processTagArray(
        subject,
        value as (StringTag | TemplaterResult)[],
        ownerSupport,
        counts,
        appendTo,
      )
      return
    
    case ValueTypes.stateRender:
    case ValueTypes.tagComponent:
      if(appendTo) {
        const processResult = processFirstSubjectComponent(
          value as TemplaterResult,
          subject as ContextItem,
          ownerSupport,
          counts,
          appendTo as Element,
        )
        return processResult
      }

      const processResult = processReplacementComponent(
        value as TemplaterResult,
        subject as ContextItem,
        ownerSupport,
        counts,
      )
      return processResult
      
    case BasicTypes.function:
    case ValueTypes.oneRender:
      const v = value as Wrapper
      if(valueType === ValueTypes.oneRender) {
        const support = oneRenderToSupport(
          v,
          subject as ContextItem,
          ownerSupport,
        )
        
        renderTagOnly(
          support,
          undefined, // support,
          subject as ContextItem,
          ownerSupport,
        )
        
        return processNewTag(
          support.templater,
          ownerSupport,
          subject as ContextItem,
          appendTo as Element,
        )
      }
      break
  }

  processFirstRegularValue(
    value as RegularValue,
    subject,
    subject.global.placeholder as Text,
  )
}

function processFirstRegularValue(
  value: RegularValue,
  subject: ContextItem, // could be tag via subject.tag
  insertBefore: Text, // <template end interpolate /> (will be removed)
) {
  const castedValue = castTextValue(value)
  const clone = updateBeforeTemplate(
    castedValue,
    insertBefore, // this will be removed
  )

  subject.global.simpleValueElm = clone  
}
