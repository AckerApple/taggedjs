import { getFakeTemplater, newSupportByTemplater, processTag } from './processTag.function.js'
import { processNowRegularValue, RegularValue } from './processRegularValue.function.js'
import { processReplacementComponent } from './processFirstSubjectComponent.function.js'
import { updateExistingTagComponent } from './updateExistingTagComponent.function.js'
import { AnySupport, BaseSupport, getSupport, Support } from '../Support.class.js'
import { SupportTagGlobal, TemplaterResult } from '../TemplaterResult.class.js'
import { BasicTypes, ValueType, ValueTypes } from '../ValueTypes.enum.js'
import { updateSupportBy } from '../updateSupportBy.function.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { isArray, isTagComponent } from '../../isInstance.js'
import { getNewGlobal } from './getNewGlobal.function.js'
import { StringTag, DomTag, Tag } from '../Tag.class.js'
import { processTagArray } from './processTagArray.js'
import { ContextItem } from '../Context.types.js'

export function updateExistingValue(
  contextItem: ContextItem, // InterpolateSubject,
  value: TemplateValue,
  ownerSupport: BaseSupport | Support,
) {
  // Do not continue if the value is just the same
  if(value === contextItem.value) {
    return
  }

  const wasDestroyed = contextItem.checkValueChange(value, contextItem)

  if(wasDestroyed === -1) {
    return // do nothing
  }

  // handle already seen tag components
  const tagJsType = value && (value as any).tagJsType as ValueType
  if(tagJsType) {
    if(tagJsType === ValueTypes.renderOnce) {
      return
    }

    const isComp = isTagComponent(value)
    if(isComp) {
      contextItem.global = contextItem.global || getNewGlobal()

      prepareUpdateToComponent(
        value as TemplaterResult,
        contextItem as ContextItem,
        ownerSupport,
      )

      return
    }
  }
  
  const global = contextItem.global as SupportTagGlobal
  if(global) {
    // was component but no longer
    const support = global.newest
    if( support ) {
      if(typeof(value) === BasicTypes.function) {
        return
      }
  
      handleStillTag(
        support,
        contextItem as ContextItem,
        value as TemplaterResult,
        ownerSupport
      )
  
      if(!global.locked) {
        ++global.renderCount
      }
    
      return
    }
  }

  if(tagJsType) {
    switch (tagJsType) {
      case ValueTypes.templater:
        processTag(
          ownerSupport,
          contextItem,
        )
        return
      
      case ValueTypes.tag:
      case ValueTypes.dom:
        const tag = value as StringTag | DomTag
        let templater = tag.templater

        if(!templater) {
          templater = getFakeTemplater()
          tag.templater = templater
          templater.tag = tag
        }
  
        const nowGlobal = contextItem.global = (contextItem.global || getNewGlobal()) as SupportTagGlobal
        nowGlobal.newest = newSupportByTemplater(templater, ownerSupport, contextItem)
    
        processTag(
          ownerSupport,
          contextItem,
        )
      
        return
    }
  }

  if(isArray(value)) {
    processTagArray(
      contextItem,
      value as (TemplaterResult | StringTag)[],
      ownerSupport,
      {added: 0, removed: 0}
    )
  
    return
  }

  if(typeof(value) === BasicTypes.function) {
    contextItem.value = value // do not render functions that are not explicity defined as tag html processing
    return
  }
  
  if(wasDestroyed) {
    processNowRegularValue(
      value as RegularValue,
      contextItem,
    )
  }
}

function handleStillTag(
  lastSupport: AnySupport,
  subject: ContextItem,
  value: StringTag | TemplateValue,
  ownerSupport: BaseSupport | Support,
) {
  const templater = (value as Tag).templater || value

  const valueSupport = getSupport(
    templater as TemplaterResult,
    ownerSupport,
    ownerSupport.appSupport,
    subject,
  )

  const lastSubject = lastSupport.subject as ContextItem
  const newGlobal = lastSubject.global as SupportTagGlobal
  const oldest = newGlobal.oldest
  updateSupportBy(oldest, valueSupport)
}

function prepareUpdateToComponent(
  templater: TemplaterResult,
  contextItem: ContextItem,
  ownerSupport: BaseSupport | Support,
): void {
  const global = contextItem.global as SupportTagGlobal
  // When last value was not a component
  if(!global.newest) {
    processReplacementComponent(
      templater,
      contextItem,
      ownerSupport,
      {added:0, removed:0},
    )
    return
  }
  
  const support = getSupport(
    templater,
    ownerSupport,
    ownerSupport.appSupport,
    contextItem,
  )

  updateExistingTagComponent(
    ownerSupport,
    support, // latest value
    contextItem,
  )
}
