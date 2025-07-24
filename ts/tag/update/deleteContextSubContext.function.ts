import { AdvancedContextItem } from '../AdvancedContextItem.type.js'
import { addPaintRemover } from '../../render/paint.function.js'
import { AnySupport } from '../AnySupport.type.js'
import { SubContext } from './SubContext.type.js'
import { ContextItem } from '../ContextItem.type.js'
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js'

export function deleteContextSubContext(
  contextItem: ContextItem,
  ownerSupport: AnySupport,
) {
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
  
  // delete (contextItem as any).delete
  
  if(!subContext.hasEmitted) {
    return
  }

  const subContextItem = subContext.contextItem as AdvancedContextItem
  const subTagJsVar = subContextItem.tagJsVar as TagJsVar
  subTagJsVar.delete(
    subContextItem,
    ownerSupport,
  )

  return 76
}