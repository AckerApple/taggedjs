import { SupportContextItem } from './SupportContextItem.type.js'
import { destroySupport } from '../render/destroySupport.function.js'
import { AnySupport } from './index.js'
import { ContextItem } from './ContextItem.type'
import { SupportTagGlobal } from './getTemplaterResult.function'


export function destroySupportByContextItem(
  context: ContextItem,
) {
  ++context.updateCount
  const global = context.global as SupportTagGlobal
  const state = (context as SupportContextItem).state
  const lastSupport = state.newest as AnySupport

  // destroy old component, value is not a component
  destroySupport(lastSupport, global)
  
  destroySupportContext(context as SupportContextItem)
}

function destroySupportContext(context: SupportContextItem) {
  // delete context.htmlDomMeta
  context.htmlDomMeta = []
  delete (context as ContextItem).contexts
  delete (context as ContextItem).state
  delete (context as ContextItem).global
  context.renderCount = 0
}
