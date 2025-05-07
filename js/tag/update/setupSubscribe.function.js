import { paint, paintAppends } from '../paint.function.js';
import { setUseMemory } from '../../state/setUseMemory.object.js';
import { syncSupports } from '../../state/syncStates.function.js';
import { forceUpdateExistingValue } from './forceUpdateExistingValue.function.js';
import { getSupportWithState } from '../../interpolations/attributes/getSupportWithState.function.js';
import { ValueTypes } from '../ValueTypes.enum.js';
import { createAndProcessContextItem } from './createAndProcessContextItem.function.js';
export function setupSubscribe(observable, contextItem, ownerSupport, counts, callback, appendTo, insertBefore) {
    let appendMarker;
    // do we need to append now but process subscription later?
    if (appendTo) {
        appendMarker = insertBefore = document.createTextNode('');
        paintAppends.push({
            element: insertBefore,
            relative: appendTo,
        });
    }
    const subscription = setupSubscribeCallbackProcessor(observable, contextItem, ownerSupport, counts, callback, insertBefore);
    contextItem.delete = () => {
        console.log('🗑️ delete subscribe');
        subscription.contextItem.delete(subscription.contextItem);
        subscription.subscription.unsubscribe();
        if (appendMarker) {
            const parentNode = appendMarker.parentNode;
            parentNode.removeChild(appendMarker);
        }
    };
    contextItem.handler = (value, newSupport, contextItem) => {
        checkSubscribeFrom(value, newSupport, contextItem, subscription);
    };
}
export function setupSubscribeCallbackProcessor(observable, contextItem, ownerSupport, // ownerSupport ?
counts, // used for animation stagger computing
callback, insertBefore) {
    const component = getSupportWithState(ownerSupport);
    let lastValue = undefined;
    const getLastValue = () => lastValue;
    let onValue = function onSubValue(value) {
        memory.hasEmitted = true;
        memory.contextItem = createAndProcessContextItem(value, ownerSupport, counts, undefined, insertBefore);
        // from now on just run update
        onValue = function subscriptionUpdate(value) {
            forceUpdateExistingValue(memory.contextItem, value, ownerSupport);
            if (!syncRun && !setUseMemory.stateConfig.support) {
                paint();
            }
        };
    };
    // onValue mutates so function below calls original and mutation
    const valueChangeHandler = function subValueProcessor(value) {
        lastValue = value;
        const newComponent = component.subject.global.newest;
        syncSupports(newComponent, component);
        if (memory.callback) {
            value = memory.callback(value);
        }
        onValue(value);
    };
    // aka setup
    const memory = {
        hasEmitted: false,
        handler: valueChangeHandler,
        getLastValue,
        callback,
        states: component.states,
    };
    contextItem.subscription = memory;
    let syncRun = true;
    memory.subscription = observable.subscribe(valueChangeHandler);
    syncRun = false;
    return memory;
}
function checkSubscribeFrom(value, newSupport, contextItem, subscription) {
    if (!value || !value.tagJsType || value.tagJsType !== ValueTypes.subscribe) {
        contextItem.delete(contextItem);
        return 99;
    }
    if (!subscription.hasEmitted) {
        return -1;
    }
    subscription.callback = value.callback;
    subscription.handler(subscription.getLastValue());
    const newComponent = getSupportWithState(newSupport);
    subscription.states = newComponent.states;
    return -1;
}
//# sourceMappingURL=setupSubscribe.function.js.map