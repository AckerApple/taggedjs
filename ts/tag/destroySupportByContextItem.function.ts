import { SupportContextItem } from './SupportContextItem.type.js'
import { destroySupport } from '../render/destroySupport.function.js'
import { AnySupport } from './index.js'
import { ContextItem } from './ContextItem.type'
import { SupportTagGlobal } from './getTemplaterResult.function'


export function destroySupportByContextItem(
  context: ContextItem
) {
  const global = context.global as SupportTagGlobal
  const lastSupport = (context as SupportContextItem).state.newest as AnySupport

  // destroy old component, value is not a component
  destroySupport(lastSupport, global)
  
  delete context.contexts
  delete (context as ContextItem).state
  delete (context as ContextItem).global
  ;(context as SupportContextItem).renderCount = 0
}
