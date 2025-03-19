import { processFirstSubjectValue } from '../tag/update/processFirstSubjectValue.function.js';
import { processSubUpdate } from './processSubscriptionUpdate.function.js';
import { setUseMemory } from '../state/setUseMemory.object.js';
import { paint } from '../tag/paint.function.js';
/** Used for when dynamic value is truly something to subscribe to */
export function subscribeToTemplate({ subject, support, counts, contextItem, appendTo, }) {
    let onValue = function onSubValue(value) {
        processFirstSubjectValue(value, contextItem, support, { ...counts }, syncRun ? appendTo : undefined);
        if (!syncRun && !setUseMemory.stateConfig.support) {
            paint();
        }
        // from now on just run update
        onValue = function subscriptionUpdate(value) {
            processSubUpdate(value, contextItem, support);
        };
    };
    // onValue mutates so function below calls original and mutation
    const callback = function subValueProcessor(value) {
        onValue(value);
    };
    let syncRun = true;
    const sub = subject.subscribe(callback);
    contextItem.subject = subject;
    syncRun = false;
    const global = support.subject.global;
    const subs = global.subscriptions = global.subscriptions || [];
    subs.push(sub);
    // contextItem.handler = blankHandler
}
//# sourceMappingURL=subscribeToTemplate.function.js.map