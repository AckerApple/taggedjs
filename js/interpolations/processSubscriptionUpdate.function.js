import { updateExistingValue } from '../tag/update/updateExistingValue.function.js';
import { setUseMemory } from '../state/setUseMemory.object.js';
import { paint } from '../tag/paint.function.js';
/** Used for values that are to subscribe to */
export function processSubUpdate(value, // Observable | Subject
contextItem, support) {
    const global = support.subject.global;
    const isSameValue = value === contextItem.value;
    if (global.deleted || isSameValue) {
        return; // same value emitted
    }
    updateExistingValue(contextItem, value, support);
    if (!setUseMemory.stateConfig.support) {
        paint();
    }
    return;
}
//# sourceMappingURL=processSubscriptionUpdate.function.js.map