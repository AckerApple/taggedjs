import { processFirstSubjectValue } from '../tag/update/processFirstSubjectValue.function.js';
import { processSubUpdate } from './processSubscriptionUpdate.function.js';
import { setUseMemory } from '../state/setUseMemory.object.js';
import { paint } from '../tag/paint.function.js';
/** @deprecated Used for when dynamic value is truly something to subscribe to */
export function subscribeToTemplate({ subject, support, counts, contextItem, appendTo, }) {
    const sub = setupSubscribeCallbackProcessor(subject, contextItem, support, counts, appendTo);
    // Manage unsubscribing
    const global = support.subject.global;
    const subs = global.subscriptions = global.subscriptions || [];
    subs.push(sub);
}
function setupSubscribeCallbackProcessor(observable, contextItem, support, // ownerSupport ?
counts, // used for animation stagger computing
appendTo) {
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
    }; // as unknown as (ValueSubjectSubscriber<Callback> & ValueSubjectSubscriber<unknown>)
    let syncRun = true;
    const sub = observable.subscribe(callback);
    contextItem.subject = observable;
    syncRun = false;
    return sub;
}
//# sourceMappingURL=subscribeToTemplate.function.js.map