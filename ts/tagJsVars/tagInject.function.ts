import { getContextInCycle } from '../tag/cycles/setContextInCycle.function.js'
import { ContextItem } from '../tag/ContextItem.type.js'

/** Inject a parent tag or host into the current context 
 * For host functions, returns the value returned by the host callback
 * For tag components, returns the tag instance itself
 */
export function tagInject<T extends (...args: any[]) => any>(
  targetItem: T
): ReturnType<T> {
  const context = getContextInCycle()
  
  if (!context) {
    throw new Error('tag.inject can only be called within a tag or host context')
  }
  
  // Search up the context tree for a matching parent
  let currentContext: ContextItem | undefined = context.parentContext
  
  while (currentContext) {
    
    // Check if this is an attributes context with child contexts
    const contexts = currentContext.contexts as ContextItem[]
    if (contexts) {
      // Search within the attributes contexts
      for (const attrContext of contexts) {
        if (attrContext.isAttr && attrContext.tagJsVar?.matchesInjection) {
          // Use the matchesInjection method if available
          if (attrContext.tagJsVar.matchesInjection(targetItem)) {
            // For host values, return the returnValue from the context
            return attrContext.returnValue
          }
        }
      }
    }
    
    // Check if this context has a tagJsVar with matchesInjection
    if (currentContext.tagJsVar?.matchesInjection) {
      if (currentContext.tagJsVar.matchesInjection(targetItem)) {
        // For tag components, return the tag instance
        return currentContext.returnValue
      }
    }
    
    // Move up to the parent context
    currentContext = currentContext.parentContext
  }
  
  const message = `Could not find parent context for tag.inject ${targetItem}`
  console.error(message, {targetItem, context})
  throw new Error(message)
}