import { BasicTypes } from '../ValueTypes.enum.js';
import { isTagComponent } from '../../isInstance.js';
import { getNewGlobal } from './getNewGlobal.function.js';
import { handleStillTag } from './handleStillTag.function.js';
import { updateExistingTagComponent } from '../../render/update/updateExistingTagComponent.function.js';
import { createSupport } from '../createSupport.function.js';
/** result is an indication to ignore further processing but that does not seem in use anymore */
export function tryUpdateToTag(contextItem, newValue, // newValue
ownerSupport) {
    const isComp = isTagComponent(newValue);
    if (isComp) {
        if (contextItem.global === undefined) {
            getNewGlobal(contextItem);
        }
        contextItem.oldTagJsVar = contextItem.tagJsVar;
        contextItem.tagJsVar = newValue;
        prepareUpdateToComponent(newValue, contextItem, ownerSupport);
        return true;
    }
    // detect if previous value was a tag
    const global = contextItem.global;
    if (global) {
        contextItem.oldTagJsVar = contextItem.tagJsVar;
        contextItem.tagJsVar = newValue;
        // its html/dom based tag
        const support = contextItem.state.newest;
        if (support) {
            if (typeof (newValue) === BasicTypes.function) {
                return true;
            }
            handleStillTag(support, contextItem, newValue, ownerSupport);
            return true;
        }
    }
    ;
    newValue.processInit(newValue, contextItem, ownerSupport, contextItem.placeholder);
    contextItem.oldTagJsVar = contextItem.tagJsVar;
    contextItem.tagJsVar = newValue;
    return true;
}
function prepareUpdateToComponent(templater, contextItem, ownerSupport) {
    // When last value was not a component
    if (!contextItem.state.newest) {
        ;
        templater.processInit(templater, contextItem, ownerSupport, contextItem.placeholder);
        return;
    }
    const support = createSupport(templater, contextItem, ownerSupport, ownerSupport.appSupport);
    updateExistingTagComponent(ownerSupport, support, // latest value
    contextItem);
}
//# sourceMappingURL=tryUpdateToTag.function.js.map