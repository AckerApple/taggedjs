import { setUseMemory } from '../state/setUse.function.js';
import { checkStateMismatch } from './checkStateMismatch.function.js';
/** Compares states of previous renders
 * @property support - The workflow that supports a single tag
 * @property ownerSupport - undefined when "support" is the app element
 */
export function runAfterRender(support, ownerSupport) {
    const subject = support.subject;
    ++subject.renderCount;
    const config = setUseMemory.stateConfig;
    delete config.support;
    support.state = config.stateArray;
    // support.states = config.states
    setUseMemory.tagClosed$.next(ownerSupport);
    checkStateMismatch(config, support);
    subject.global.newest = support;
}
//# sourceMappingURL=afterRender.function.js.map