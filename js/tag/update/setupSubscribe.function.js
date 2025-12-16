import { paint } from '../../render/paint.function.js';
import { setUseMemory } from '../../state/setUseMemory.object.js';
import { forceUpdateExistingValue } from './forceUpdateExistingValue.function.js';
import { deleteSubContext } from './deleteContextSubContext.function.js';
import { onFirstSubContext } from './onFirstSubContext.function.js';
import { guaranteeInsertBefore } from '../guaranteeInsertBefore.function.js';
import { valueToTagJsVar } from '../../tagJsVars/valueToTagJsVar.function.js';
import { processUpdateSubscribe } from './processUpdateSubscribe.function.js';
import { removeContextInCycle, setContextInCycle } from '../cycles/setContextInCycle.function.js';
export function setupSubscribe(value, contextItem, ownerSupport, insertBeforeOriginal, // optional but will always be made
appendTo) {
    const observables = value.Observables;
    const { appendMarker, insertBefore } = guaranteeInsertBefore(appendTo, insertBeforeOriginal);
    let onOutput = function onSubValue(value, syncRun, subContext) {
        onFirstSubContext(value, subContext, ownerSupport, insertBefore);
        checkToPaint(syncRun);
        // MUTATION: from now on just run update
        onOutput = subContext.tagJsVar.onOutput = function subscriptionUpdate(updateValue, syncRun, subContext) {
            const aContext = subContext.contextItem;
            forceUpdateExistingValue(aContext, updateValue, ownerSupport);
            aContext.tagJsVar.processUpdate(updateValue, aContext, ownerSupport, [updateValue]);
            // processUpdateContext(ownerSupport)
            aContext.value = updateValue;
            checkToPaint(syncRun);
        };
    };
    const subContext = setupSubscribeCallbackProcessor(observables, ownerSupport, (value, syncRun, subContext) => onOutput(value, syncRun, subContext), value, contextItem);
    subContext.appendMarker = appendMarker;
    contextItem.subContext = subContext;
    value.processUpdate = processUpdateSubscribe;
    value.onOutput = onOutput;
    return subContext;
}
/** After calling this function you need to set `contextItem.subContext = subContext` */
export function setupSubscribeCallbackProcessor(observables, ownerSupport, // ownerSupport ?
onOutput, tagJsVar, contextItem) {
    // const component = getSupportWithState(ownerSupport)
    // onValue mutates so function below calls original and mutation
    function subValueHandler(value, index) {
        subContext.lastValues[index] = {
            value,
            tagJsVar: valueToTagJsVar(value),
            oldTagJsVar: subContext.lastValues[index]?.tagJsVar
        };
        valuesHandler(subContext.lastValues, index);
    }
    function valuesHandler(newValues, index) {
        const newestParentTagJsVar = subContext.tagJsVar;
        const callback = newestParentTagJsVar?.callback;
        if (callback) {
            setContextInCycle(contextItem);
            const responseValue = newestParentTagJsVar.callback(...newValues.map(x => x.value));
            onOutput(responseValue, syncRun, subContext);
            removeContextInCycle();
            return;
        }
        const newValue = newValues[index].value;
        onOutput(newValue, syncRun, subContext);
    }
    let syncRun = true;
    const subContext = {
        lastValues: [],
        subValueHandler,
        valuesHandler,
        tagJsVar,
        subscriptions: [],
    };
    // HINT: Must subscribe AFTER initial variable created above incase subscribing causes immediate run
    observables.forEach((observable, index) => {
        syncRun = true;
        subContext.subscriptions.push(observable.subscribe(value => subValueHandler(value, index)));
        syncRun = false;
    });
    tagJsVar.onOutput = onOutput;
    return subContext;
}
export function unsubscribeContext(contextItem) {
    const subscription = contextItem.subContext;
    if (!subscription) {
        return; // TODO: wonder why this happens, maybe subscription never emits?
    }
    const subscriptions = subscription.subscriptions;
    subscriptions.forEach(sub => sub.unsubscribe());
    delete contextItem.subContext;
}
export function deleteAndUnsubscribe(contextItem, ownerSupport) {
    ++contextItem.updateCount;
    const subContext = contextItem.subContext;
    unsubscribeContext(contextItem);
    return deleteSubContext(subContext, ownerSupport);
}
export function checkToPaint(syncRun) {
    if (syncRun) {
        return;
    }
    if (setUseMemory.stateConfig.support) {
        return;
    }
    paint();
}
//# sourceMappingURL=setupSubscribe.function.js.map