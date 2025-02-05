import { checkArrayValueChange, checkSimpleValueChange, checkTagValueChange } from '../checkDestroyPrevious.function.js'
import { processFirstSubjectComponent, processReplacementComponent } from './processFirstSubjectComponent.function.js'
import { newSupportByTemplater, processTag, tagFakeTemplater } from './processTag.function.js'
import { castTextValue, updateBeforeTemplate } from '../../updateBeforeTemplate.function.js'
import {SupportTagGlobal, TemplaterResult, Wrapper } from '../getTemplaterResult.function.js'
import { oneRenderToSupport } from './oneRenderToSupport.function.js'
import { Counts } from '../../interpolations/interpolateTemplate.js'
import { AnySupport, SupportContextItem } from '../getSupport.function.js'
import { renderTagOnly } from '../render/renderTagOnly.function.js'
import { RegularValue } from './processRegularValue.function.js'
import { isArray, isSubjectInstance } from '../../isInstance.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { ValueType, ValueTypes } from '../ValueTypes.enum.js'
import { getNewGlobal } from './getNewGlobal.function.js'
import { processTagArray } from './processTagArray.js'
import { StringTag, DomTag } from '../getDomTag.function.js'
import { ContextItem } from '../Context.types.js'
import { processNewSubjectTag } from './processNewSubjectTag.function.js'

export function processFirstSubjectValue(
  value: TemplateValue | StringTag,
  contextItem: ContextItem, // could be tag via result.tag
  ownerSupport: AnySupport, // owningSupport
  counts: Counts, // {added:0, removed:0}
  valueId: string,
  appendTo?: Element,
): AnySupport | undefined {
  const tagJsType = (value as TemplaterResult)?.tagJsType as ValueType
  if(tagJsType) {
    switch (tagJsType) {
      // TODO: Do we ever get in here? because dom, tag, and component are covered below
      case ValueTypes.templater:
        contextItem.checkValueChange = checkTagValueChange

        if(appendTo) {
          return processNewSubjectTag(
            value as TemplaterResult,
            ownerSupport,
            contextItem,
            appendTo,
            counts,
          )
        }
        
        return processTag(
          ownerSupport,
          contextItem,
          counts,
        )

      case ValueTypes.dom:
      case ValueTypes.tag: {
        contextItem.checkValueChange = checkTagValueChange
        const tag = value as StringTag | DomTag
        let templater = tag.templater
  
        if(!templater) {
          templater = tagFakeTemplater(tag) // TODO: most likely a not needed performance hit
        }

        const global = getNewGlobal(contextItem) as SupportTagGlobal
  
        if(appendTo) {
          return processNewSubjectTag(
            templater,
            ownerSupport,
            contextItem as ContextItem,
            appendTo,
            counts,
          )
        }
  
        global.newest = newSupportByTemplater(templater, ownerSupport, contextItem)
        contextItem.checkValueChange = checkTagValueChange
  
        return processTag(
          ownerSupport,
          contextItem,
          counts,
        )
      }

      case ValueTypes.stateRender:
      case ValueTypes.tagComponent: {

        getNewGlobal(contextItem) as SupportTagGlobal
        contextItem.checkValueChange = checkTagValueChange

        if(appendTo) {
          const processResult = processFirstSubjectComponent(
            value as TemplaterResult,
            contextItem as SupportContextItem,
            ownerSupport,
            counts,
            appendTo as Element,
          )
          
          // ++contextItem.global.renderCount

          return processResult
        }
  
        const processResult = processReplacementComponent(
          value as TemplaterResult,
          contextItem as SupportContextItem,
          ownerSupport,
          counts,
        )
        
        // ++contextItem.global.renderCount
        
        return processResult
      }

      case ValueTypes.renderOnce: {
        getNewGlobal(contextItem) as SupportTagGlobal

        const support = oneRenderToSupport(
          value as Wrapper,
          contextItem as ContextItem,
          ownerSupport,
        )
        
        renderTagOnly(
          support,
          undefined,
          contextItem as SupportContextItem,
          ownerSupport,
        )
        
        const result = processNewSubjectTag(
          support.templater,
          ownerSupport,
          contextItem as ContextItem,
          appendTo as Element,
          counts,
        )

        // ++contextItem.global.renderCount
        contextItem.checkValueChange = checkTagValueChange

        return result
      }
    }
  }

  if(isArray(value)) {
    processTagArray(
      contextItem,
      value as (StringTag | TemplaterResult)[],
      ownerSupport,
      counts,
      appendTo,
    )

    contextItem.checkValueChange = checkArrayValueChange

    return
  }

  if(isSubjectInstance(value)) {
    return // will be subscribed to for value
  }

  processFirstRegularValue(
    value as RegularValue,
    contextItem,
    contextItem.placeholder as Text,
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
