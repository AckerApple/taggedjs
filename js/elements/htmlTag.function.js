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
        newElement.attributes = cloneShallowArray(pushKid.attributes);
        newElement.listeners = cloneShallowArray(pushKid.listeners);
        newElement.allListeners = cloneShallowArray(pushKid.allListeners);
        let contexts = newElement.contexts;
        newElement.innerHTML = args;
        // review each child for potential to be context
        for (let index = 0; index < args.length; ++index) {
            const arg = args[index];
            if (!isValueForContext(arg)) {
                continue;
            }
            if (arg.tagJsType === 'element') {
                appendArray(newElement.allListeners, arg.allListeners);
                if (arg.contexts) {
                    if (!contexts) {
                        contexts = [];
                        newElement.contexts = contexts;
                    }
                    // the argument is an element so push up its contexts into mine
                    appendArray(contexts, arg.contexts);
                    ++newElement.contentId;
                }
                continue;
            }
            if (!contexts) {
                contexts = [];
                newElement.contexts = contexts;
            }
            contexts.push(arg);
        }
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
function appendArray(target, source) {
    for (let index = 0; index < source.length; ++index) {
        target.push(source[index]);
    }
}
function assignFunctionMembers(target, source) {
    for (const key in source) {
        const value = source[key];
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
    }
}
//# sourceMappingURL=htmlTag.function.js.map