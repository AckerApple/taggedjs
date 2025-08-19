import { AnySupport } from '../index.js'
import { SupportContextItem } from '../SupportContextItem.type.js'
import {SupportTagGlobal, TemplaterResult } from '../getTemplaterResult.function.js'
import { BasicTypes } from '../ValueTypes.enum.js'
import { isTagComponent } from '../../isInstance.js'
import { getNewGlobal } from './getNewGlobal.function.js'
import { ContextItem } from '../ContextItem.type.js'
import { handleStillTag } from './handleStillTag.function.js'
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js'
import { updateExistingTagComponent } from '../../render/update/updateExistingTagComponent.function.js'
import { createSupport } from '../createSupport.function.js'

/** result is an indication to ignore further processing but that does not seem in use anymore */
export function tryUpdateToTag(
  contextItem: ContextItem | SupportContextItem,
  newValue: TemplaterResult, // newValue
  ownerSupport: AnySupport,
): boolean {
  const isComp = isTagComponent(newValue)

  if(isComp) {
    if(contextItem.global === undefined) {
      getNewGlobal(contextItem as SupportContextItem)
    }

    prepareUpdateToComponent(
      newValue,
      contextItem as SupportContextItem,
      ownerSupport,
    )

    contextItem.oldTagJsVar = contextItem.tagJsVar
    contextItem.tagJsVar = newValue

    return true
  }

  // detect if previous value was a tag
  const global = contextItem.global as SupportTagGlobal
  if(global) {
    contextItem.oldTagJsVar = contextItem.tagJsVar
    contextItem.tagJsVar = newValue

    // its html/dom based tag
    const support = (contextItem as SupportContextItem).state.newest
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

  ;(newValue as TagJsVar).processInit(
    newValue,
    contextItem,
    ownerSupport,
    undefined, // appendTo,
    contextItem.placeholder,
  )

  contextItem.oldTagJsVar = contextItem.tagJsVar
  contextItem.tagJsVar = newValue

  return true
}

function prepareUpdateToComponent(
  templater: TemplaterResult,
  contextItem:SupportContextItem,
  ownerSupport: AnySupport,
): void {
  // When last value was not a component
  if(!contextItem.state.newest) {
    ;(templater as TagJsVar).processInit(
      templater,
      contextItem,
      ownerSupport,
      undefined, // appendTo,
      contextItem.placeholder,
    )
    return
  }

  const support = createSupport(
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
