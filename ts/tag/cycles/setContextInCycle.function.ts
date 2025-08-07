import { setUseMemory } from '../../state/index.js'
import { AttributeContextItem } from '../AttributeContextItem.type.js'
import { ContextItem } from '../index.js'

export function getContextInCycle(): AttributeContextItem | ContextItem | undefined {
  return setUseMemory.stateConfig.context
}

/** Gets the current element associated with taggedjs document processing */
export function getElement(): HTMLElement {
  const context = getContextInCycle() as AttributeContextItem
  return context.element as HTMLElement
}

export function setContextInCycle(context: ContextItem) {
  return setUseMemory.stateConfig.context = context
}

export function removeContextInCycle() {
  delete setUseMemory.stateConfig.context
}