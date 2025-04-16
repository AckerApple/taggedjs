import { AnySupport, SupportContextItem } from '../getSupport.function.js'
import { getFakeTemplater, newSupportByTemplater, processTag } from './processTag.function.js'
import {SupportTagGlobal, TemplaterResult } from '../getTemplaterResult.function.js'
import { processNowRegularValue, RegularValue } from './processRegularValue.function.js'
import { processReplacementComponent } from './processFirstSubjectComponent.function.js'
import { updateExistingTagComponent } from './updateExistingTagComponent.function.js'
import { BasicTypes, ValueType, ValueTypes } from '../ValueTypes.enum.js'
import { updateSupportBy } from '../updateSupportBy.function.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { isArray, isTagComponent } from '../../isInstance.js'
import { getNewGlobal } from './getNewGlobal.function.js'
import { StringTag, DomTag, Tag } from '../getDomTag.function.js'
import { processTagArray } from './processTagArray.js'
import { ContextItem } from '../Context.types.js'
import { Counts } from '../../interpolations/interpolateTemplate.js'
import { getSupport } from '../getSupport.function.js'

const fooCounts: Counts = { added: 0, removed: 0 }

/** Used for all tag value updates. Determines if value changed since last render */
export function updateExistingValue(
  contextItem: ContextItem |SupportContextItem,
  newValue: TemplateValue, // newValue
  ownerSupport: AnySupport,
) {
  // Do not continue if the value is just the same
  if(newValue === contextItem.value) {
    return
  }

  // Have the context check itself (avoid having to detect old value)
  const ignoreOrDestroyed = contextItem.checkValueChange(
    newValue,
    contextItem as SupportContextItem
  )

  // ignore
  if(ignoreOrDestroyed === -1) {
    return // do nothing
  }

  // is new value a tag?
  const tagJsType = newValue && (newValue as TemplaterResult).tagJsType as ValueType
  if(tagJsType) {
    if(tagJsType === ValueTypes.renderOnce) {
      return
    }

    tryUpdateToTag(
      contextItem,
      newValue as TemplaterResult,
      ownerSupport,
    )

    return
  }
  

  if( isArray(newValue) ) {
    processTagArray(
      contextItem,
      newValue as (TemplaterResult | StringTag)[],
      ownerSupport,
      {added: 0, removed: 0}
    )
  
    return
  }

  if(typeof(newValue) === BasicTypes.function) {
    contextItem.value = newValue // do not render functions that are not explicity defined as tag html processing
    return
  }
  
  if(ignoreOrDestroyed) {
    processNowRegularValue(
      newValue as RegularValue,
      contextItem,
    )
  }
}

function updateToTag(
  value: TemplateValue,
  contextItem: ContextItem | SupportContextItem,
  ownerSupport: AnySupport
) {
  const tag = value as StringTag | DomTag
  let templater = tag.templater

  if (!templater) {
    templater = getFakeTemplater()
    tag.templater = templater
    templater.tag = tag
  }

  const nowGlobal = (contextItem.global ? contextItem.global : getNewGlobal(contextItem)) as SupportTagGlobal
  nowGlobal.newest = newSupportByTemplater(templater, ownerSupport, contextItem)

  processTag(
    ownerSupport,
    contextItem as SupportContextItem,
    fooCounts
  )
}

function handleStillTag(
  lastSupport: AnySupport,
  subject: ContextItem,
  value: StringTag | TemplateValue,
  ownerSupport: AnySupport,
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

export function prepareUpdateToComponent(
  templater: TemplaterResult,
  contextItem:SupportContextItem,
  ownerSupport: AnySupport,
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

export function updateContextItemBySupport(
  support: AnySupport,
  contextItem:SupportContextItem,
  value: TemplaterResult,
  ownerSupport: AnySupport,
) {
  if(typeof(value) === BasicTypes.function) {
    return
  }

  handleStillTag(
    support,
    contextItem as ContextItem,
    value,
    ownerSupport,
  )

  return

}

/** result is an indication to ignore further processing but that does not seem in use anymore */
export function tryUpdateToTag(
  contextItem: ContextItem |SupportContextItem,
  newValue: TemplaterResult, // newValue
  ownerSupport: AnySupport, 
): boolean {
  const tagJsType = newValue.tagJsType
  const isComp = isTagComponent(newValue)
  if(isComp) {
    if(contextItem.global === undefined) {
      getNewGlobal(contextItem)
    }

    prepareUpdateToComponent(
      newValue,
      contextItem as SupportContextItem,
      ownerSupport,
    )

    return true
  }

  // detect if previous value was a tag
  const global = contextItem.global as SupportTagGlobal
  if(global) {
    // its html/dom based tag
    const support = global.newest
    if( support ) {
      updateContextItemBySupport(
        support,
        contextItem as SupportContextItem,
        newValue,
        ownerSupport,
      )

      return true
    }
  }

  
  switch (tagJsType) {
    case ValueTypes.templater:
      processTag(
        ownerSupport,
        contextItem as SupportContextItem,
        fooCounts,
      )
      return true
    
    // when value was not a Tag before
    case ValueTypes.tag:
    case ValueTypes.dom: {
      updateToTag(newValue, contextItem, ownerSupport)
      return true
    }
  }

  return false
}