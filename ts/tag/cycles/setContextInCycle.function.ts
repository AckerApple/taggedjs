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

// const contextCycles: ContextItem[] = []
export function setContextInCycle(context: ContextItem | undefined) {
  // contextCycles.push(context)
  return setUseMemory.stateConfig.context = context
}

export function removeContextInCycle() {
  // contextCycles.pop()
  delete setUseMemory.stateConfig.context
}