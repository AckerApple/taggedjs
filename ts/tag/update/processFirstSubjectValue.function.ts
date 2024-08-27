import { processTagArray } from './processTagArray.js'
import { SupportTagGlobal, TemplaterResult, Wrapper } from '../TemplaterResult.class.js'
import { RegularValue } from './processRegularValue.function.js'
import { newSupportByTemplater, processNewTag, processTag, tagFakeTemplater } from './processTag.function.js'
import { AnySupport } from '../Support.class.js'
import { StringTag, DomTag } from '../Tag.class.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { renderTagOnly } from '../render/renderTagOnly.function.js'
import { BasicTypes, ImmutableTypes, ValueType, ValueTypes } from '../ValueTypes.enum.js'
import { oneRenderToSupport } from './oneRenderToSupport.function.js'
import { castTextValue, updateBeforeTemplate } from '../../updateBeforeTemplate.function.js'
import { processFirstSubjectComponent, processReplacementComponent } from './processFirstSubjectComponent.function.js'
import { Counts } from '../../interpolations/interpolateTemplate.js'
import { getNewGlobal } from './getNewGlobal.function.js'
import { ContextItem } from '../Context.types.js'
import { checkArrayValueChange, checkSimpleValueChange, checkTagValueChange } from '../checkDestroyPrevious.function.js'
import { isArray, isSubjectInstance } from '../../isInstance.js'

export function processFirstSubjectValue(
  value: TemplateValue | StringTag,
  subject: ContextItem, // could be tag via result.tag
  ownerSupport: AnySupport, // owning support
  counts: Counts, // {added:0, removed:0}
  appendTo?: Element,
): AnySupport | undefined {
  const tagJsType = (value as any)?.tagJsType as ValueType
  if(tagJsType) {
    switch (tagJsType) {
      case ValueTypes.templater:
        subject.checkValueChange = checkTagValueChange

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
        subject.checkValueChange = checkTagValueChange
        const tag = value as StringTag | DomTag
        let templater = tag.templater
  
        if(!templater) {
          templater = tagFakeTemplater(tag) // TODO: most likely a not needed performance hit
        }

        const global = subject.global = getNewGlobal() as SupportTagGlobal
  
        if(appendTo) {
          return processNewTag(
            templater,
            ownerSupport,
            subject as ContextItem,
            appendTo,
          )
        }
  
        global.newest = newSupportByTemplater(templater, ownerSupport, subject)
        subject.checkValueChange = checkTagValueChange
  
        return processTag(
          ownerSupport,
          subject,
        )

      case ValueTypes.stateRender:
      case ValueTypes.tagComponent:
        subject.global = getNewGlobal() as SupportTagGlobal
        subject.checkValueChange = checkTagValueChange

        if(appendTo) {
          const processResult = processFirstSubjectComponent(
            value as TemplaterResult,
            subject as ContextItem,
            ownerSupport,
            counts,
            appendTo as Element,
          )
          
          ++subject.global.renderCount

          return processResult
        }
  
        const processResult = processReplacementComponent(
          value as TemplaterResult,
          subject as ContextItem,
          ownerSupport,
          counts,
        )
        
        ++subject.global.renderCount
        
        return processResult

      case ValueTypes.renderOnce:
        subject.global = getNewGlobal() as SupportTagGlobal

        const support = oneRenderToSupport(
          value as Wrapper,
          subject as ContextItem,
          ownerSupport,
        )
        
        renderTagOnly(
          support,
          undefined, // support,
          subject as ContextItem,
          ownerSupport,
        )
        
        const result = processNewTag(
          support.templater,
          ownerSupport,
          subject as ContextItem,
          appendTo as Element,
        )

        ++subject.global.renderCount
        subject.checkValueChange = checkTagValueChange

        return result
    }
  }

  if(isArray(value)) {
    processTagArray(
      subject,
      value as (StringTag | TemplaterResult)[],
      ownerSupport,
      counts,
      appendTo,
    )

    subject.checkValueChange = checkArrayValueChange

    return
  }

  if(isSubjectInstance(value)) {
    return // will be subscribed to for value
  }

  processFirstRegularValue(
    value as RegularValue,
    subject,
    subject.placeholder as Text,
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

  subject.simpleValueElm = clone  
  subject.checkValueChange = checkSimpleValueChange
}
