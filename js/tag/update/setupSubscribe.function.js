import { paint } from '../paint.function.js';
import { setUseMemory } from '../../state/setUseMemory.object.js';
import { processFirstSubjectValue } from './processFirstSubjectValue.function.js';
import { syncSupports } from '../../state/syncStates.function.js';
import { forceUpdateExistingValue } from './updateExistingValue.function.js';
import { getSupportWithState } from '../../interpolations/attributes/getSupportWithState.function.js';
export function setupSubscribe(observable, contextItem, ownerSupport, counts, callback, appendTo) {
    const setup = setupSubscribeCallbackProcessor(observable, contextItem, ownerSupport, counts, callback, appendTo);
    contextItem.delete = () => {
        setup.subscription.unsubscribe();
    };
    contextItem.handler = (value, values, newSupport) => {
        if (!setup.hasEmitted) {
            return;
        }
        setup.callback = value.callback;
        setup.handler(setup.getLastValue());
        const newComponent = getSupportWithState(newSupport);
        setup.states = newComponent.states;
    };
}
export function setupSubscribeCallbackProcessor(observable, contextItem, support, // ownerSupport ?
counts, // used for animation stagger computing
callback, appendTo) {
    const component = getSupportWithState(support);
    let lastValue = undefined;
    const getLastValue = () => lastValue;
    let onValue = function onSubValue(value) {
        if (memory.callback) {
            value = memory.callback(value);
        }
        memory.hasEmitted = true;
        processFirstSubjectValue(value, contextItem, support, { ...counts }, syncRun ? appendTo : undefined);
        if (!syncRun && !setUseMemory.stateConfig.support) {
            paint();
        }
        // from now on just run update
        onValue = function subscriptionUpdate(value) {
            // processSubUpdate(value, contextItem, support)
            forceUpdateExistingValue(contextItem, value, support);
            if (!syncRun && !setUseMemory.stateConfig.support) {
                paint();
            }
            //paint()
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
    }; // as unknown as (ValueSubjectSubscriber<Callback> & ValueSubjectSubscriber<unknown>)
    // aka setup
    const memory = {
        hasEmitted: false,
        handler: valueChangeHandler,
        getLastValue,
        callback,
        // states: [...component.states],
        states: component.states,
    };
    let syncRun = true;
    memory.subscription = observable.subscribe(valueChangeHandler);
    // contextItem.subject = value.Observable as any
    syncRun = false;
    return memory;
}
//# sourceMappingURL=setupSubscribe.function.js.map