import { blankHandler } from '../render/dom/blankHandler.function.js';
import { elementFunctions, isValueForContext } from './elementFunctions.js';
import { elementVarToHtmlString } from './elementVarToHtmlString.function.js';
import { destroyDesignElement } from './destroyDesignElement.function.js';
import { processDesignElementUpdate, checkTagElementValueChange } from './processDesignElementUpdate.function.js';
import { processDesignElementInit } from './processDesignElementInit.function.js';
export function htmlTag(tagName) {
    const element = {
        component: false,
        tagJsType: 'element',
        processInitAttribute: blankHandler,
        processInit: processDesignElementInit,
        destroy: destroyDesignElement,
        processUpdate: processDesignElementUpdate,
        hasValueChanged: checkTagElementValueChange,
        tagName,
        innerHTML: [],
        attributes: [],
        contentId: 0,
        listeners: [],
        allListeners: [],
        elementFunctions,
    };
    const pushKid = getPushKid(element, elementFunctions);
    pushKid.tagName = tagName;
    return pushKid;
}
export function getPushKid(element, _elmFunctions) {
    const pushKid = function pushKid(...args) {
        const newElement = { ...pushKid };
        newElement.attributes = [...pushKid.attributes];
        newElement.listeners = [...pushKid.listeners];
        newElement.allListeners = [...pushKid.allListeners];
        const contexts = newElement.contexts = newElement.contexts || [];
        newElement.innerHTML = args;
        // review each child for potential to be context
        args.forEach(function forGetPushKid(arg) {
            if (!isValueForContext(arg)) {
                return;
            }
            if (arg.tagJsType === 'element') {
                newElement.allListeners.push(...arg.allListeners);
                if (arg.contexts) {
                    // the argument is an element so push up its contexts into mine
                    contexts.push(...arg.contexts);
                    ++newElement.contentId;
                }
                return;
            }
            registerMockChildContext(arg, newElement);
        });
        return newElement;
    };
    Object.assign(pushKid, element);
    assignFunctionMembers(pushKid, _elmFunctions(pushKid));
    pushKid.attributes = cloneShallowArray(element.attributes);
    pushKid.listeners = cloneShallowArray(element.listeners);
    pushKid.allListeners = cloneShallowArray(element.allListeners);
    pushKid.toString = function () {
        return elementVarToHtmlString(this);
    };
    return pushKid;
}
function cloneShallowArray(value) {
    return value.length ? value.slice() : [];
}
/** used during updates */
function registerMockChildContext(value, mockElm) {
    if (!mockElm.contexts) {
        mockElm.contexts = [];
    }
    mockElm.contexts.push(value);
}
function assignFunctionMembers(target, source) {
    Object.entries(source).forEach(function forAssignFunctionMembers([key, value]) {
        try {
            target[key] = value;
        }
        catch {
            Object.defineProperty(target, key, {
                value,
                writable: true,
                configurable: true,
                enumerable: false,
            });
        }
    });
}
//# sourceMappingURL=htmlTag.function.js.map