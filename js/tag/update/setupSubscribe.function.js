import { paint } from '../../render/paint.function.js';
import { setUseMemory } from '../../state/setUseMemory.object.js';
import { syncSupports } from '../../state/syncStates.function.js';
import { forceUpdateExistingValue } from './forceUpdateExistingValue.function.js';
import { getSupportWithState } from '../../interpolations/attributes/getSupportWithState.function.js';
import { deleteSubContext } from './deleteSubContext.function.js';
import { checkSubContext } from './checkSubContext.function.js';
import { onFirstSubContext } from './onFirstSubContext.function.js';
import { guaranteeInsertBefore } from '../guaranteeInsertBefore.function.js';
export function setupSubscribe(observable, contextItem, ownerSupport, counts, callback, appendTo, insertBeforeOriginal) {
    const { appendMarker, insertBefore } = guaranteeInsertBefore(appendTo, insertBeforeOriginal);
    const subContext = setupSubscribeCallbackProcessor(observable, ownerSupport, counts, insertBefore, callback);
    subContext.appendMarker = appendMarker;
    contextItem.subContext = subContext;
    contextItem.handler = checkSubContext;
    return subContext;
}
export function setupSubscribeCallbackProcessor(observable, ownerSupport, // ownerSupport ?
counts, // used for animation stagger computing
insertBefore, callback) {
    const component = getSupportWithState(ownerSupport);
    let onValue = function onSubValue(value) {
        onFirstSubContext(value, subContext, ownerSupport, counts, insertBefore);
        // from now on just run update
        onValue = function subscriptionUpdate(value) {
            forceUpdateExistingValue(subContext.contextItem, value, ownerSupport);
            if (!syncRun && !setUseMemory.stateConfig.support) {
                paint();
            }
        };
    };
    // onValue mutates so function below calls original and mutation
    function valueHandler(value) {
        subContext.lastValue = value;
        const newComponent = component.subject.global.newest;
        syncSupports(newComponent, component);
        if (subContext.callback) {
            value = subContext.callback(value);
        }
        onValue(value);
    }
    let syncRun = true;
    const subContext = {
        valueHandler,
        callback,
    };
    // HINT: Must subscribe AFTER initial variable created above incase subscribing causes immediate run
    subContext.subscription = observable.subscribe(valueHandler);
    syncRun = false;
    return subContext;
}
export function deleteAndUnsubscribe(contextItem, ownerSupport) {
    const subscription = contextItem.subContext;
    subscription.subscription.unsubscribe();
    return deleteSubContext(contextItem, ownerSupport);
}
//# sourceMappingURL=setupSubscribe.function.js.map