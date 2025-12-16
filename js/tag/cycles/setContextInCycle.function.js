import { setUseMemory } from '../../state/index.js';
export function getContextInCycle() {
    return setUseMemory.stateConfig.context;
}
/** Gets the current element associated with taggedjs document processing */
export function getElement() {
    const context = getContextInCycle();
    return context.element;
}
// const contextCycles: ContextItem[] = []
export function setContextInCycle(context) {
    // contextCycles.push(context)
    return setUseMemory.stateConfig.context = context;
}
export function removeContextInCycle() {
    // contextCycles.pop()
    delete setUseMemory.stateConfig.context;
}
//# sourceMappingURL=setContextInCycle.function.js.map