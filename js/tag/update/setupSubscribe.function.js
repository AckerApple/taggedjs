import { paint } from '../../render/paint.function.js';
import { setUseMemory } from '../../state/setUseMemory.object.js';
import { syncSupports } from '../../state/syncStates.function.js';
import { forceUpdateExistingValue } from './forceUpdateExistingValue.function.js';
import { getSupportWithState } from '../../interpolations/attributes/getSupportWithState.function.js';
import { deleteSubContext } from './deleteSubContext.function.js';
import { checkSubContext } from './checkSubContext.function.js';
import { onFirstSubContext } from './onFirstSubContext.function.js';
import { guaranteeInsertBefore } from '../guaranteeInsertBefore.function.js';
export function setupSubscribe(observables, contextItem, ownerSupport, counts, callback, appendTo, insertBeforeOriginal) {
    const { appendMarker, insertBefore } = guaranteeInsertBefore(appendTo, insertBeforeOriginal);
    const subContext = setupSubscribeCallbackProcessor(observables, ownerSupport, counts, insertBefore, callback);
    subContext.appendMarker = appendMarker;
    contextItem.subContext = subContext;
    // contextItem.handler = checkSubContext
    contextItem.tagJsVar.processUpdate = checkSubContext;
    return subContext;
}
export function setupSubscribeCallbackProcessor(observables, ownerSupport, // ownerSupport ?
counts, // used for animation stagger computing
insertBefore, callback) {
    const component = getSupportWithState(ownerSupport);
    let onOutput = function onSubValue(value) {
        onFirstSubContext(value, subContext, ownerSupport, counts, insertBefore);
        checkToPaint(syncRun);
        // MUTATION: from now on just run update
        onOutput = function subscriptionUpdate(updateValue) {
            const aContext = subContext.contextItem;
            forceUpdateExistingValue(aContext, updateValue, ownerSupport, { added: 0, removed: 0 });
            checkToPaint(syncRun);
        };
    };
    // onValue mutates so function below calls original and mutation
    function valueHandler(value, index) {
        subContext.lastValues[index] = value;
        valuesHandler(subContext.lastValues);
    }
    function valuesHandler(values) {
        const newComponent = component.context.global.newest;
        syncSupports(newComponent, component);
        if (subContext.callback) {
            const responseValue = subContext.callback(...values);
            onOutput(responseValue);
            return;
        }
        onOutput(values[0]);
    }
    let syncRun = true;
    const subContext = {
        lastValues: [],
        valueHandler,
        valuesHandler,
        callback,
        subscriptions: [],
    };
    // HINT: Must subscribe AFTER initial variable created above incase subscribing causes immediate run
    observables.forEach((observable, index) => {
        syncRun = true;
        subContext.subscriptions.push(observable.subscribe(value => valueHandler(value, index)));
        syncRun = false;
    });
    return subContext;
}
export function deleteAndUnsubscribe(contextItem, ownerSupport) {
    const subscription = contextItem.subContext;
    subscription.subscriptions.forEach(sub => sub.unsubscribe());
    return deleteSubContext(contextItem, ownerSupport);
}
function checkToPaint(syncRun) {
    if (!syncRun && !setUseMemory.stateConfig.support) {
        paint();
    }
}
//# sourceMappingURL=setupSubscribe.function.js.map