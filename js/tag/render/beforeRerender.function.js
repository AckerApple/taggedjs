import { reState } from '../../state/state.utils.js';
import { setUseMemory } from '../../state/setUse.function.js';
export function beforeRerender(support, // new
prevState) {
    reState(support, setUseMemory.stateConfig, prevState);
    return;
}
//# sourceMappingURL=beforeRerender.function.js.map