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
        // appendTo = undefined
    }
    const setup = setupSubscribeCallbackProcessor(observable, contextItem, ownerSupport, counts, callback, insertBefore);
    const deleteMe = contextItem.delete = () => {
        setup.contextItem.delete(setup.contextItem);
        setup.subscription.unsubscribe();
        if (appendMarker) {
            const parentNode = appendMarker.parentNode;
            parentNode.removeChild(appendMarker);
        }
    };
    contextItem.handler = (value, values, newSupport) => {
        if (!value || !value.tagJsType || value.tagJsType !== ValueTypes.subscribe) {
            deleteMe();
            return 99;
        }
        if (!setup.hasEmitted) {
            return;
        }
        setup.callback = value.callback;
        setup.handler(setup.getLastValue());
        const newComponent = getSupportWithState(newSupport);
        setup.states = newComponent.states;
    };
}
export function setupSubscribeCallbackProcessor(observable, contextItem, ownerSupport, // ownerSupport ?
counts, // used for animation stagger computing
callback, insertBefore) {
    const component = getSupportWithState(ownerSupport);
    let lastValue = undefined;
    const getLastValue = () => lastValue;
    let onValue = function onSubValue(value) {
        if (memory.callback) {
            value = memory.callback(value);
        }
        memory.hasEmitted = true;
        memory.contextItem = createAndProcessContextItem(value, ownerSupport, counts, insertBefore);
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
    let syncRun = true;
    memory.subscription = observable.subscribe(valueChangeHandler);
    syncRun = false;
    return memory;
}
//# sourceMappingURL=setupSubscribe.function.js.map