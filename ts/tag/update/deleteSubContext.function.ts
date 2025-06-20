import { AdvancedContextItem } from '../AdvancedContextItem.type.js'
import { paintCommands, paintRemover } from '../../render/paint.function.js'
import { AnySupport } from '../AnySupport.type.js'
import { tagValueUpdateHandler } from './tagValueUpdateHandler.function.js'
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
    paintCommands.push([paintRemover, [appendMarker, 'subcontext-delete']])
    delete subscription.appendMarker
  }
  
  delete (contextItem as any).delete
  contextItem.handler = tagValueUpdateHandler
  // ;(contextItem as any).checkValueChange = tagValueUpdateHandler
  
  if(!subscription.hasEmitted) {
    return
  }

  const subContextItem = subscription.contextItem as AdvancedContextItem
  const tagJsVar = subContextItem.tagJsVar as TagJsVar
  tagJsVar.delete(
    subContextItem,
    ownerSupport,
  )

  return 76
}
