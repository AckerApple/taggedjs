import { paint, paintAppend, paintAppends, paintCommands, paintRemover } from '../../render/paint.function.js';
import { setUseMemory } from '../../state/setUseMemory.object.js';
import { syncSupports } from '../../state/syncStates.function.js';
import { forceUpdateExistingValue } from './forceUpdateExistingValue.function.js';
import { getSupportWithState } from '../../interpolations/attributes/getSupportWithState.function.js';
import { empty, ValueTypes } from '../ValueTypes.enum.js';
import { createAndProcessContextItem } from './createAndProcessContextItem.function.js';
import { tagValueUpdateHandler } from './tagValueUpdateHandler.function.js';
import { updateToDiffValue } from './updateToDiffValue.function.js';
export function setupSubscribe(observable, contextItem, ownerSupport, counts, callback, appendTo, insertBefore) {
    let appendMarker;
    // do we need to append now but process subscription later?
    if (appendTo) {
        appendMarker = insertBefore = document.createTextNode(empty);
        paintAppends.push({
            processor: paintAppend,
            args: [appendTo, insertBefore]
        });
    }
    const subscription = setupSubscribeCallbackProcessor(observable, ownerSupport, counts, callback, insertBefore);
    subscription.appendMarker = appendMarker;
    contextItem.subscription = subscription;
    contextItem.delete = deleteSubscribe;
    contextItem.handler = checkSubscribeFrom;
    return subscription;
}
export function setupSubscribeCallbackProcessor(observable, ownerSupport, // ownerSupport ?
counts, // used for animation stagger computing
callback, insertBefore) {
    const component = getSupportWithState(ownerSupport);
    let onValue = function onSubValue(value) {
        subscription.hasEmitted = true;
        subscription.contextItem = createAndProcessContextItem(value, ownerSupport, counts, insertBefore);
        /*
            if(!syncRun && !setUseMemory.stateConfig.support) {
              paint()
            }
        */
        // from now on just run update
        onValue = function subscriptionUpdate(value) {
            forceUpdateExistingValue(subscription.contextItem, value, ownerSupport);
            if (!syncRun && !setUseMemory.stateConfig.support) {
                paint();
            }
        };
    };
    // onValue mutates so function below calls original and mutation
    const valueChangeHandler = function subValueProcessor(value) {
        subscription.lastValue = value;
        const newComponent = component.subject.global.newest;
        syncSupports(newComponent, component);
        if (subscription.callback) {
            value = subscription.callback(value);
        }
        onValue(value);
    };
    let syncRun = true;
    // aka setup
    const subscription = {
        hasEmitted: false,
        handler: valueChangeHandler,
        callback,
        states: component.states,
        lastValue: undefined,
        subscription: undefined, // must be populated AFTER "subscription" variable defined incase called on subscribe
    };
    subscription.subscription = observable.subscribe(valueChangeHandler);
    syncRun = false;
    return subscription;
}
function checkSubscribeFrom(newValue, ownerSupport, contextItem) {
    if (!newValue || !newValue.tagJsType || newValue.tagJsType !== ValueTypes.subscribe) {
        contextItem.delete(contextItem, ownerSupport);
        updateToDiffValue(newValue, contextItem, ownerSupport, 99);
        return 99;
    }
    const subscription = contextItem.subscription;
    if (!subscription.hasEmitted) {
        return -1;
    }
    subscription.callback = newValue.callback;
    subscription.handler(subscription.lastValue);
    const newComponent = getSupportWithState(ownerSupport);
    subscription.states = newComponent.states;
    return -1;
}
function deleteSubscribe(contextItem, ownerSupport) {
    const subscription = contextItem.subscription;
    subscription.deleted = true;
    delete contextItem.subscription;
    subscription.subscription.unsubscribe();
    const appendMarker = subscription.appendMarker;
    if (appendMarker) {
        paintCommands.push({
            processor: paintRemover,
            args: [appendMarker],
        });
        delete subscription.appendMarker;
    }
    delete contextItem.delete;
    // delete contextItem.handler
    contextItem.handler = tagValueUpdateHandler;
    if (!subscription.hasEmitted) {
        return;
    }
    subscription.contextItem.delete(subscription.contextItem, ownerSupport);
    return 77;
}
//# sourceMappingURL=setupSubscribe.function.js.map