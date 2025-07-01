import { AdvancedContextItem } from '../AdvancedContextItem.type.js'
import { addPaintRemover } from '../../render/paint.function.js'
import { AnySupport } from '../AnySupport.type.js'
import { SubContext } from './SubContext.type.js'
import { ContextItem } from '../ContextItem.type.js'
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js'

export function deleteSubContext(
  contextItem: ContextItem,
  ownerSupport: AnySupport,
) {
  const subscription = contextItem.subContext as SubContext

  subscription.deleted = true
  delete contextItem.subContext
  
  const appendMarker = subscription.appendMarker
  if(appendMarker) {
    addPaintRemover(appendMarker)
    delete subscription.appendMarker
  }
  
  delete (contextItem as any).delete
  // contextItem.handler = tagValueUpdateHandler
  // const tagJsVar = contextItem.tagJsVar as TagJsVar
  //tagJsVar.processUpdate = tagValueUpdateHandler
  
  if(!subscription.hasEmitted) {
    return
  }

  const subContextItem = subscription.contextItem as AdvancedContextItem
  const subTagJsVar = subContextItem.tagJsVar as TagJsVar
  subTagJsVar.delete(
    subContextItem,
    ownerSupport,
  )

  return 76
}
