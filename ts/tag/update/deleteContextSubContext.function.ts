import { ContextItem } from '../ContextItem.type.js'
import { addPaintRemover } from '../../render/paint.function.js'
import { AnySupport } from '../index.js'
import { SubContext } from './SubContext.type.js'
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js'

export function deleteContextSubContext(
  contextItem: ContextItem,
  ownerSupport: AnySupport,
) {
  ++contextItem.updateCount
  const subscription = contextItem.subContext as SubContext
  const result = deleteSubContext(subscription, ownerSupport)
  delete contextItem.subContext
  return result
}

export function deleteSubContext(
  subContext: SubContext,
  ownerSupport: AnySupport,
) {
  subContext.deleted = true
  
  const appendMarker = subContext.appendMarker
  if(appendMarker) {
    addPaintRemover(appendMarker, 'deleteSubContext')
    delete subContext.appendMarker
  }
  
  // delete (contextItem as any).destroy
  
  if(!subContext.hasEmitted) {
    return
  }

  const subContextItem = subContext.contextItem as ContextItem
  const subTagJsVar = subContextItem.tagJsVar as TagJsVar
  
  subTagJsVar.destroy(
    subContextItem,
    ownerSupport,
  )

  return 76
}