import { ValueTypes } from "../tag/index.js";
import { syncWrapCallback } from "../tag/output.function.js";
import { removeContextInCycle, setContextInCycle } from "../tag/cycles/setContextInCycle.function.js";
import { initState } from "../state/state.utils.js";
import { reState } from '../state/reState.function.js';
import { runAfterRender } from "../render/runAfterRender.function.js";
import { handleTagTypeChangeFrom } from "../tag/update/handleTagTypeChangeFrom.function.js";
import { isFunction } from "../index.js";
/** Use to gain access to element
 * @callback called every render
 */
export function host(callback, options = {}) {
    const baseHost = {
        tagJsType: ValueTypes.host,
        processInitAttribute: processHostAttribute,
        // TODO: maybe a host value can change?
        hasValueChanged: () => 0,
        processInit: processHost, // This should be a throw error because only attribute is supported
        processUpdate: processHostUpdate,
        destroy: deleteHost,
        options: { callback, ...options },
        matchesInjection(inject, context) {
            const options = inject?.options;
            if (!options) {
                return false;
            }
            const injectCallback = options?.callback;
            // Check if the inject target is a host with the same callback
            if (injectCallback === callback) {
                return context;
            }
            return false;
        },
    };
    const returnFunction = (...args) => {
        const hostValue = {
            ...returnFunction,
            options: { arguments: args, ...options, callback },
        };
        return hostValue;
    };
    Object.assign(returnFunction, baseHost);
    // returnFunction.options = { callback }
    return returnFunction;
}
// Attach the functions to the host namespace
;
host.onInit = (callback) => {
    return host(() => { }, { onInit: callback });
};
host.onDestroy = (callback) => {
    return host(() => { }, { onDestroy: callback });
};
function processHostUpdate(newValue, contextItem, ownerSupport) {
    if (isFunction(newValue) && !newValue?.tagJsType) {
        throw new Error('issue on its way');
    }
    const hasChanged = handleTagTypeChangeFrom(ValueTypes.host, newValue, 
    // TagJsTag,
    ownerSupport, contextItem);
    if (hasChanged) {
        return hasChanged;
    }
    const oldTagJsTag = contextItem.tagJsVar;
    const oldOptions = oldTagJsTag.options;
    // const element = (contextItem as any as AttributeContextItem).target as HTMLInputElement
    const newHost = newValue;
    reState(contextItem);
    const args = (newHost.options.arguments || oldOptions.arguments || []);
    contextItem.returnValue = newHost.options.callback(...args);
    runAfterRender(contextItem);
}
function processHostAttribute(name, value, // TemplateValue | StringTag | SubscribeValue | SignalObject,
element, tagJsVar, // same as value not needed
contextItem) {
    return processHost(tagJsVar, contextItem);
}
/* Only runs on host() init */
function processHost(tagJsVar, contextItem) {
    const element = contextItem.target;
    const state = contextItem.state = {};
    initState(contextItem);
    processHostTagJsTag(element, tagJsVar, contextItem, state);
    runAfterRender(contextItem);
}
/** first time run */
function processHostTagJsTag(element, tagJsVar, contextItem, state) {
    const args = tagJsVar.options.arguments || [];
    const returnValue = tagJsVar.options.callback(...args);
    // Store the return value for tag.inject to access
    contextItem.returnValue = returnValue;
    // DEPRECATED
    const options = tagJsVar.options;
    if (options.onInit) {
        // const element = contextItem.target as HTMLInputElement
        options.onInit(element, tagJsVar, contextItem, state);
    }
    return returnValue;
}
function deleteHost(contextItem) {
    ++contextItem.updateCount;
    const attrContext = contextItem;
    const TagJsTag = attrContext.tagJsVar;
    const options = TagJsTag.options;
    if (attrContext.destroy$.subscribers.length) {
        // TODO: Not sure if this needed
        setContextInCycle(contextItem);
        syncWrapCallback([], attrContext.destroy$.next.bind(attrContext.destroy$), contextItem);
        // TODO: Not sure if this needed
        removeContextInCycle();
    }
    // DEPRECATED
    // TODO: remove this code and use tag.onDestroy instead
    if (options.onDestroy) {
        const element = attrContext.target;
        const hostDestroy = function processHostDestroy() {
            setContextInCycle(contextItem);
            const result = options.onDestroy(element, TagJsTag, attrContext, attrContext.state);
            removeContextInCycle();
            return result;
        };
        const stateOwner = contextItem.stateOwner;
        return syncWrapCallback([], hostDestroy, stateOwner.context);
    }
}
//# sourceMappingURL=host.function.js.map