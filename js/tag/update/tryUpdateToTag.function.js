import { BasicTypes } from '../ValueTypes.enum.js';
import { isTagComponent } from '../../isInstance.js';
import { getNewGlobal } from './getNewGlobal.function.js';
import { handleStillTag } from './handleStillTag.function.js';
import { updateExistingTagComponent } from '../../render/update/updateExistingTagComponent.function.js';
import { createSupport } from '../createSupport.function.js';
/** result is an indication to ignore further processing but that does not seem in use anymore */
export function tryUpdateToTag(contextItem, newValue, // newValue
ownerSupport, counts) {
    const isComp = isTagComponent(newValue);
    contextItem.tagJsVar = newValue;
    if (isComp) {
        if (contextItem.global === undefined) {
            getNewGlobal(contextItem);
        }
        prepareUpdateToComponent(newValue, contextItem, ownerSupport, counts);
        return true;
    }
    // detect if previous value was a tag
    const global = contextItem.global;
    if (global) {
        // its html/dom based tag
        const support = global.newest;
        if (support) {
            if (typeof (newValue) === BasicTypes.function) {
                return true;
            }
            handleStillTag(support, contextItem, newValue, ownerSupport);
            return true;
        }
    }
    ;
    newValue.processInit(newValue, contextItem, ownerSupport, counts, undefined, // appendTo,
    contextItem.placeholder);
    return true;
}
function prepareUpdateToComponent(templater, contextItem, ownerSupport, counts) {
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
//# sourceMappingURL=tryUpdateToTag.function.js.map