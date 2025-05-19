import { getFakeTemplater, newSupportByTemplater, processTag } from '../../render/update/processTag.function.js';
import { BasicTypes, ValueTypes } from '../ValueTypes.enum.js';
import { isTagComponent } from '../../isInstance.js';
import { getNewGlobal } from './getNewGlobal.function.js';
import { handleStillTag } from './handleStillTag.function.js';
import { prepareUpdateToComponent } from './tagValueUpdateHandler.function.js';
const fooCounts = { added: 0, removed: 0 };
/** result is an indication to ignore further processing but that does not seem in use anymore */
export function tryUpdateToTag(contextItem, newValue, // newValue
ownerSupport) {
    const tagJsType = newValue.tagJsType;
    const isComp = isTagComponent(newValue);
    if (isComp) {
        if (contextItem.global === undefined) {
            getNewGlobal(contextItem);
        }
        prepareUpdateToComponent(newValue, contextItem, ownerSupport);
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
    switch (tagJsType) {
        case ValueTypes.templater:
            processTag(ownerSupport, contextItem, fooCounts);
            return true;
        // when value was not a Tag before
        case ValueTypes.tag:
        case ValueTypes.dom: {
            updateToTag(newValue, contextItem, ownerSupport);
            return true;
        }
        case ValueTypes.subscribe: {
            ;
            newValue.processInit(newValue, contextItem, ownerSupport, { added: 0, removed: 0 }, undefined, // appendTo,
            contextItem.placeholder);
            return true;
        }
    }
    return false;
}
function updateToTag(value, contextItem, ownerSupport) {
    const tag = value;
    let templater = tag.templater;
    if (!templater) {
        templater = getFakeTemplater();
        tag.templater = templater;
        templater.tag = tag;
    }
    const nowGlobal = (contextItem.global ? contextItem.global : getNewGlobal(contextItem));
    nowGlobal.newest = newSupportByTemplater(templater, ownerSupport, contextItem);
    processTag(ownerSupport, contextItem, fooCounts);
}
//# sourceMappingURL=tryUpdateToTag.function.js.map