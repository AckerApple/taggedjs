import { paintAfters } from "../render/paint.function.js";
import { ValueTypes } from "../tag/index.js";
import { syncWrapCallback } from "../tag/output.function.js";
import { handleTagTypeChangeFrom } from "../tag/update/checkSubContext.function.js";
/** Use to gain access to element */
export function host(callback, options = {}) {
    return {
        tagJsType: ValueTypes.host,
        processInit: processHost,
        processUpdate: processHostUpdate,
        delete: deleteHost,
        options: { callback, ...options },
    };
}
function processHostUpdate(newValue, ownerSupport, contextItem, _values, counts) {
    const hasChanged = handleTagTypeChangeFrom(ValueTypes.host, newValue, ownerSupport, contextItem, counts);
    if (hasChanged) {
        return hasChanged;
    }
    const tagJsVar = contextItem.tagJsVar;
    const options = tagJsVar.options;
    const element = contextItem.element;
    options.callback(element, newValue);
}
function processHost(element, tagJsVar, contextItem) {
    tagJsVar.options.callback(element, tagJsVar);
    const options = tagJsVar.options;
    if (options.onInit) {
        const element = contextItem.element;
        options.onInit(element, tagJsVar, contextItem);
    }
}
function deleteHost(contextItem) {
    const tagJsVar = contextItem.tagJsVar;
    const options = tagJsVar.options;
    if (options.onDestroy) {
        const element = contextItem.element;
        const hostDestroy = function processHostDestroy() {
            options.onDestroy(element);
        };
        paintAfters.push([function hostCloser() {
                const stateOwner = contextItem.stateOwner;
                syncWrapCallback([], hostDestroy, stateOwner);
            }, []]);
    }
}
//# sourceMappingURL=host.function.js.map