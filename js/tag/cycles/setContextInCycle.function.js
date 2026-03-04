import { setUseMemory } from '../../state/index.js';
export function getContextInCycle() {
    return setUseMemory.stateConfig.context;
}
/** Gets the current element associated with taggedjs document processing */
export function getElement() {
    const context = getContextInCycle();
    return context.target;
}
const contextCycles = [];
export function setContextInCycle(context) {
    contextCycles.push(context);
    return setUseMemory.stateConfig.context = context;
}
export function removeContextInCycle() {
    contextCycles.pop();
    setUseMemory.stateConfig.context = contextCycles[contextCycles.length - 1];
}
//# sourceMappingURL=setContextInCycle.function.js.map