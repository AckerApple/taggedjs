import { AnySupport } from '../AnySupport.type.js'
import { SupportContextItem } from '../SupportContextItem.type.js'
import {SupportTagGlobal, TemplaterResult } from '../getTemplaterResult.function.js'
import { BasicTypes } from '../ValueTypes.enum.js'
import { isTagComponent } from '../../isInstance.js'
import { getNewGlobal } from './getNewGlobal.function.js'
import { ContextItem } from '../ContextItem.type.js'
import { handleStillTag } from './handleStillTag.function.js'
import { prepareUpdateToComponent } from './tagValueUpdateHandler.function.js'
import { TagCounts } from '../TagCounts.type.js'
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js'

/** result is an indication to ignore further processing but that does not seem in use anymore */
export function tryUpdateToTag(
  contextItem: ContextItem | SupportContextItem,
  newValue: TemplaterResult, // newValue
  ownerSupport: AnySupport,
  counts: TagCounts,
): boolean {
  const isComp = isTagComponent(newValue)

  if(isComp) {
    if(contextItem.global === undefined) {
      getNewGlobal(contextItem as ContextItem)
    }

    prepareUpdateToComponent(
      newValue,
      contextItem as SupportContextItem,
      ownerSupport,
      counts,
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

  ;(newValue as TagJsVar).processInit(
    newValue,
    contextItem,
    ownerSupport,
    counts,
    undefined, // appendTo,
    contextItem.placeholder,
  )

  return true
}
