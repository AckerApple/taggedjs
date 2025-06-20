import { AnySupport } from './AnySupport.type.js'
import { SupportContextItem } from './SupportContextItem.type.js'
import { getNewGlobal } from './update/getNewGlobal.function.js'
import { destroySupport } from '../render/destroySupport.function.js'
import { SupportTagGlobal, TemplaterResult } from './getTemplaterResult.function.js'
import { isStaticTag } from'../isInstance.js'
import { isLikeTags } from'./isLikeTags.function.js'
import { ContextItem } from './ContextItem.type.js'
import { tryUpdateToTag } from './update/tryUpdateToTag.function.js'
import { TagCounts } from './TagCounts.type.js'

export function checkTagValueChange(
  newValue: unknown,
  contextItem: SupportContextItem,
  counts: TagCounts,
) {
  // const tagJsVar = contextItem.tagJsVar
  const global = contextItem.global as SupportTagGlobal

  if(!global) {
  // if(![ValueTypes.dom, ValueTypes.templater, ValueTypes.tagComponent].includes((tagJsVar as TagJsVar).tagJsType)) {
    return 663 // its not a tag this time
  }
  
  const lastSupport = global?.newest
  const isValueTag = isStaticTag(newValue)
  const newTag = newValue as AnySupport
  
  if(isValueTag) {
    // its a different tag now
    const likeTags = isLikeTags(newTag, lastSupport)
    if(!likeTags) {
      destroySupport(lastSupport, global)
      getNewGlobal(contextItem)
      return 7 // 'tag-swap'
    }

    // always cause a redraw of static tags (was false)
    tryUpdateToTag(
      contextItem,
      newValue as TemplaterResult,
      lastSupport,
      counts,
    )

    return -1
  }

  const isTag = (newValue as any)?.tagJsType
  if(isTag) {
    const support = global.newest
    const ownerSupport = support.ownerSupport as AnySupport
    const result = tryUpdateToTag(
      contextItem,
      newValue as TemplaterResult,
      ownerSupport,
      counts,
    )

    const doNotRedraw = result === true

    if(doNotRedraw) {
      return -1
    }

    return 88 // its same tag with new values
  }
  
  destroySupportByContextItem(contextItem)
   
  return 8 // 'no-longer-tag'
}

export function destroySupportByContextItem(
  contextItem: ContextItem,
) {
  const global = contextItem.global as SupportTagGlobal
  const lastSupport = global?.newest

  // destroy old component, value is not a component
  destroySupport(lastSupport, global)
  delete (contextItem as ContextItem).global
  
  ;(contextItem as SupportContextItem).renderCount = 0
}