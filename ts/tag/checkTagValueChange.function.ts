import { AnySupport } from './AnySupport.type.js'
import { SupportContextItem } from './createHtmlSupport.function.js'
import { getNewGlobal } from './update/getNewGlobal.function.js'
import { destroySupport } from './destroySupport.function.js'
import {SupportTagGlobal, TemplaterResult } from './getTemplaterResult.function.js'
import { isStaticTag } from'../isInstance.js'
import { isLikeTags } from'./isLikeTags.function.js'
import { ContextItem } from './Context.types.js'
import { tryUpdateToTag } from './update/tryUpdateToTag.function.js'
import { paint, paintAfters } from './paint.function.js'

export function checkTagValueChange(
  newValue: unknown,
  contextItem: SupportContextItem,
) {
  const global = contextItem.global as SupportTagGlobal
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

    return false
  }

  const isTag = (newValue as any)?.tagJsType
  if(isTag) {
    const support = global.newest
    const ownerSupport = support.ownerSupport as AnySupport
    const result = tryUpdateToTag(contextItem, newValue as TemplaterResult, ownerSupport)
    return result === true ? -1 : false
  }
  
  // A subject could have emitted twice in one render cycle
  if(lastSupport.subject.renderCount === 0) {
    delete (contextItem as ContextItem).global
    contextItem.renderCount = 0

    paintAfters.push(() => {
      destroySupport(lastSupport, global)
      paintAfters.shift() // prevent endless recursion
      paint()
    })
    return 8 // never rendered
  }

  destorySupportByContextItem(contextItem)
   
  return 8 // 'no-longer-tag'
}

export function destorySupportByContextItem(
  contextItem: ContextItem,
) {
  const global = contextItem.global as SupportTagGlobal
  const lastSupport = global?.newest

  // destroy old component, value is not a component
  destroySupport(lastSupport, global)
  delete (contextItem as ContextItem).global
  
  ;(contextItem as SupportContextItem).renderCount = 0
}