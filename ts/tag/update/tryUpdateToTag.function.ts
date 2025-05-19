import { getFakeTemplater, newSupportByTemplater, processTag } from '../../render/update/processTag.function.js'
import { AnySupport } from '../AnySupport.type.js'
import { SupportContextItem } from '../createHtmlSupport.function.js'
import {SupportTagGlobal, TemplaterResult } from '../getTemplaterResult.function.js'
import { BasicTypes, ValueTypes } from '../ValueTypes.enum.js'
import { isTagComponent } from '../../isInstance.js'
import { getNewGlobal } from './getNewGlobal.function.js'
import { ContextItem } from '../Context.types.js'
import { handleStillTag } from './handleStillTag.function.js'
import { prepareUpdateToComponent } from './tagValueUpdateHandler.function.js'
import type { StringTag } from '../StringTag.type.js'
import type { DomTag } from '../DomTag.type.js'
import { Counts } from '../../interpolations/interpolateTemplate.js'
import { TemplateValue } from './processFirstSubject.utils.js'

const fooCounts: Counts = { added: 0, removed: 0 }

/** result is an indication to ignore further processing but that does not seem in use anymore */
export function tryUpdateToTag(
  contextItem: ContextItem | SupportContextItem,
  newValue: TemplaterResult, // newValue
  ownerSupport: AnySupport, 
): boolean {
  const tagJsType = newValue.tagJsType
  const isComp = isTagComponent(newValue)
  if(isComp) {
    if(contextItem.global === undefined) {
      getNewGlobal(contextItem as ContextItem)
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
      if(typeof(newValue) === BasicTypes.function) {
        return true
      }
    
      handleStillTag(
        support,
        contextItem as ContextItem,
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

    case ValueTypes.subscribe: {
      ;(newValue as any).processInit(
        newValue,
        contextItem,
        ownerSupport,
        {added: 0, removed: 0},
        undefined, // appendTo,
        contextItem.placeholder,
      )

      return true
    }
  }

  return false
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
