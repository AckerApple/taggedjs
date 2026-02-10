import { getContextInCycle } from '../tag/cycles/setContextInCycle.function.js';
/** Inject a parent tag or host into the current context
 * For host functions, returns the value returned by the host callback
 * For tag components, returns the tag instance itself
 */
export function tagInject(targetItem) {
    const context = getContextInCycle();
    if (!context) {
        throw new Error('tag.inject can only be called within a tag or host context');
    }
    // Search up the context tree for a matching parent
    let currentContext = context.parentContext;
    while (currentContext) {
        // Check if this is an attributes context with child contexts
        const contexts = currentContext.contexts;
        if (contexts) {
            // Search within the attributes contexts
            for (const attrContext of contexts) {
                if (attrContext.isAttr && attrContext.tagJsVar?.matchesInjection) {
                    // Use the matchesInjection method if available
                    const inContext = attrContext.tagJsVar.matchesInjection(targetItem, attrContext);
                    if (inContext !== undefined) {
                        // For host values, return the returnValue from the context
                        return inContext.returnValue;
                    }
                }
            }
        }
        // Check if this context has a TagJsTag with matchesInjection
        if (currentContext.tagJsVar?.matchesInjection) {
            if (currentContext.tagJsVar.matchesInjection(targetItem, currentContext)) {
                // For tag components, return the tag instance
                return currentContext.returnValue;
            }
        }
        // Move up to the parent context
        currentContext = currentContext.parentContext;
    }
    const message = `Could not find parent context for tag.inject ${targetItem}`;
    console.error(message, { targetItem, context });
    throw new Error(message);
}
//# sourceMappingURL=tagInject.function.js.map