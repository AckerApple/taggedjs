import { updateExistingTagComponent } from '../../render/update/updateExistingTagComponent.function.js';
import { forceUpdateExistingValue } from './forceUpdateExistingValue.function.js';
import { createSupport } from '../createSupport.function.js';
/** Checks if value has changed before updating. Used for all tag value updates. Determines if value changed since last render */
export function tagValueUpdateHandler(newValue, // newValue
ownerSupport, contextItem, _values, counts) {
    // Do not continue if the value is just the same
    if (newValue === contextItem.value) {
        return;
    }
    forceUpdateExistingValue(contextItem, newValue, ownerSupport, counts);
}
export function prepareUpdateToComponent(templater, contextItem, ownerSupport, counts) {
    const global = contextItem.global;
    // When last value was not a component
    if (!global.newest) {
        ;
        templater.processInit(templater, contextItem, ownerSupport, counts, undefined, // appendTo,
        contextItem.placeholder);
        return;
    }
    const support = createSupport(templater, ownerSupport, ownerSupport.appSupport, contextItem);
    updateExistingTagComponent(ownerSupport, support, // latest value
    contextItem);
}
//# sourceMappingURL=tagValueUpdateHandler.function.js.map