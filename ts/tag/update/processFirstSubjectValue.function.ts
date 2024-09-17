import { checkArrayValueChange, checkSimpleValueChange, checkTagValueChange } from '../checkDestroyPrevious.function.js'
import { processFirstSubjectComponent, processReplacementComponent } from './processFirstSubjectComponent.function.js'
import { newSupportByTemplater, processTag, tagFakeTemplater } from './processTag.function.js'
import { castTextValue, updateBeforeTemplate } from '../../updateBeforeTemplate.function.js'
import { SupportTagGlobal, TemplaterResult, Wrapper } from '../TemplaterResult.class.js'
import { oneRenderToSupport } from './oneRenderToSupport.function.js'
import { Counts } from '../../interpolations/interpolateTemplate.js'
import { AnySupport, SupportContextItem } from '../Support.class.js'
import { renderTagOnly } from '../render/renderTagOnly.function.js'
import { RegularValue } from './processRegularValue.function.js'
import { isArray, isSubjectInstance } from '../../isInstance.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { ValueType, ValueTypes } from '../ValueTypes.enum.js'
import { getNewGlobal } from './getNewGlobal.function.js'
import { processTagArray } from './processTagArray.js'
import { StringTag, DomTag } from '../Tag.class.js'
import { ContextItem } from '../Context.types.js'
import { processNewSubjectTag } from './processNewSubjectTag.function.js'

export function processFirstSubjectValue(
  value: TemplateValue | StringTag,
  subject: ContextItem, // could be tag via result.tag
  ownerSupport: AnySupport, // owning support
  counts: Counts, // {added:0, removed:0}
  valueId: string,
  appendTo?: Element,
): AnySupport | undefined {
  const tagJsType = (value as TemplaterResult)?.tagJsType as ValueType
  if(tagJsType) {
    switch (tagJsType) {
      // TODO: Do we ever get in here? because dom, tag, and component are covered below
      case ValueTypes.templater:
        subject.checkValueChange = checkTagValueChange

        if(appendTo) {
          return processNewSubjectTag(
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
      case ValueTypes.tag: {
        subject.checkValueChange = checkTagValueChange
        const tag = value as StringTag | DomTag
        let templater = tag.templater
  
        if(!templater) {
          templater = tagFakeTemplater(tag) // TODO: most likely a not needed performance hit
        }

        const global = getNewGlobal(subject) as SupportTagGlobal
  
        if(appendTo) {
          return processNewSubjectTag(
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
      }

      case ValueTypes.stateRender:
      case ValueTypes.tagComponent: {

        getNewGlobal(subject) as SupportTagGlobal
        subject.checkValueChange = checkTagValueChange

        if(appendTo) {
          const processResult = processFirstSubjectComponent(
            value as TemplaterResult,
            subject as SupportContextItem,
            ownerSupport,
            counts,
            appendTo as Element,
          )
          
          // ++subject.global.renderCount

          return processResult
        }
  
        const processResult = processReplacementComponent(
          value as TemplaterResult,
          subject as SupportContextItem,
          ownerSupport,
          counts,
        )
        
        // ++subject.global.renderCount
        
        return processResult
      }

      case ValueTypes.renderOnce: {

        getNewGlobal(subject) as SupportTagGlobal

        const support = oneRenderToSupport(
          value as Wrapper,
          subject as ContextItem,
          ownerSupport,
        )
        
        renderTagOnly(
          support,
          undefined, // support (no prev support)
          subject as SupportContextItem,
          ownerSupport,
        )
        
        const result = processNewSubjectTag(
          support.templater,
          ownerSupport,
          subject as ContextItem,
          appendTo as Element,
        )

        // ++subject.global.renderCount
        subject.checkValueChange = checkTagValueChange

        return result
      }
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
    valueId,
  )
}

function processFirstRegularValue(
  value: RegularValue,
  subject: ContextItem, // could be tag via subject.tag
  insertBefore: Text, // <template end interpolate /> (will be removed)
  valueId: string,
) {
  const castedValue = castTextValue(value)
  const clone = updateBeforeTemplate(
    castedValue,
    insertBefore, // this will be removed
  )

  // TODO: for debugging purposes only
  ;(clone as unknown as Element).id = valueId

  subject.simpleValueElm = clone  
  subject.checkValueChange = checkSimpleValueChange
}
