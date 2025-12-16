import { setUseMemory } from '../state/setUseMemory.object.js';
import { removeContextInCycle } from '../tag/cycles/setContextInCycle.function.js';
/** Compares states of previous renders
 * @property support - The workflow that supports a single tag
 * @property ownerSupport - undefined when "support" is the app element
 */
export function runAfterSupportRender(support, ownerSupport) {
    const subject = support.context;
    ++subject.renderCount;
    runAfterRender();
    setUseMemory.tagClosed$.next(ownerSupport);
}
/** run after rendering anything with state */
export function runAfterRender() {
    saveState();
    // TODO: prove this is worth having
    // checkStateMismatch(config, support)
    clearStateConfig();
    // setUseMemory.tagClosed$.next(ownerSupport)
}
function saveState() {
    const config = setUseMemory.stateConfig;
    const subject = config.context;
    subject.state = subject.state || {};
    subject.state.newer = { ...config };
    const support = config.support;
    subject.state.newest = support;
}
export function clearStateConfig() {
    const config = setUseMemory.stateConfig;
    delete config.prevSupport; // only this one really needed
    delete config.support;
    delete config.state;
    delete config.states;
    removeContextInCycle();
}
//# sourceMappingURL=afterRender.function.js.map