import { setUseMemory } from '../../state/index.js';
import { setContextInCycle } from './setContextInCycle.function.js';
export function getSupportInCycle() {
    return setUseMemory.stateConfig.support;
}
export function setSupportInCycle(support) {
    setContextInCycle(support.context);
    return setUseMemory.stateConfig.support = support;
}
//# sourceMappingURL=getSupportInCycle.function.js.map