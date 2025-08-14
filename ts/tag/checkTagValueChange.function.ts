import { AnySupport } from './AnySupport.type.js'
import { SupportContextItem } from './SupportContextItem.type.js'
import { getNewGlobal } from './update/getNewGlobal.function.js'
import { destroySupport } from '../render/destroySupport.function.js'
import { SupportTagGlobal, TemplaterResult } from './getTemplaterResult.function.js'
import { isStaticTag } from'../isInstance.js'
import { isLikeTags } from'./isLikeTags.function.js'
import { tryUpdateToTag } from './update/tryUpdateToTag.function.js'
import { destroySupportByContextItem } from './destroySupportByContextItem.function.js'

export function checkTagValueChange(
  newValue: unknown,
  contextItem: SupportContextItem,
) {
  const global = contextItem.global as SupportTagGlobal
  const lastSupport = contextItem.state?.newest as AnySupport
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
      lastSupport as AnySupport,
    )

    return -1
  }

  const isTag = (newValue as any)?.tagJsType
  if(isTag) {
    const support = contextItem.state.newest as AnySupport
    const ownerSupport = support.ownerSupport as AnySupport
    const result = tryUpdateToTag(
      contextItem,
      newValue as TemplaterResult,
      ownerSupport,
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
