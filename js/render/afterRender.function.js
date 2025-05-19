import { setUseMemory } from '../state/setUseMemory.object.js';
import { checkStateMismatch } from '../tag/checkStateMismatch.function.js';
/** Compares states of previous renders
 * @property support - The workflow that supports a single tag
 * @property ownerSupport - undefined when "support" is the app element
 */
export function runAfterRender(support, ownerSupport) {
    const subject = support.subject;
    ++subject.renderCount;
    const config = setUseMemory.stateConfig;
    support.state = config.stateArray;
    support.states = config.states;
    subject.global.newest = support;
    checkStateMismatch(config, support);
    delete config.prevSupport; // only this one really needed
    delete config.support;
    delete config.stateArray;
    delete config.states;
    setUseMemory.tagClosed$.next(ownerSupport);
}
//# sourceMappingURL=afterRender.function.js.map