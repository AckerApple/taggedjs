import { blankHandler } from '../render/dom/blankHandler.function.js';
import { elementFunctions, isValueForContext, loopObjectAttributes } from './elementFunctions.js';
import { destroyDesignElement } from './destroyDesignElement.function.js';
import { processDesignElementUpdate, checkTagElementValueChange } from './processDesignElementUpdate.function.js';
import { processDesignElementInit } from './processDesignElementInit.function.js';
export function designElement(tagName) {
    const element = {
        tagJsType: 'element',
        processInitAttribute: blankHandler,
        processInit: processDesignElementInit,
        destroy: destroyDesignElement,
        processUpdate: processDesignElementUpdate,
        hasValueChanged: checkTagElementValueChange,
        tagName,
        innerHTML: [],
        attributes: [],
        listeners: [],
        allListeners: [],
        elementFunctions,
    };
    const pushKid = getPushKid(element, elementFunctions);
    pushKid.tagName = tagName;
    return pushKid;
}
export function getPushKid(element, _elmFunctions) {
    const pushKid = (...args) => {
        const newElement = { ...pushKid };
        newElement.attributes = [...pushKid.attributes];
        newElement.listeners = [...pushKid.listeners];
        newElement.allListeners = [...pushKid.allListeners];
        if (args.length > 0 &&
            typeof args[0] === 'object' &&
            !Array.isArray(args[0]) &&
            !args[0].tagJsType // TODO: need better attribute detection
        ) {
            loopObjectAttributes(newElement, args[0]);
            args.splice(0, 1);
        }
        newElement.innerHTML = args;
        // review each child for potential to be context
        args.forEach(arg => {
            if (!isValueForContext(arg)) {
                return;
            }
            if (arg.tagJsType === 'element') {
                newElement.allListeners.push(...arg.allListeners);
                if (arg.contexts) {
                    // the argument is an element so push up its contexts into mine
                    if (!newElement.contexts) {
                        // newElement.contexts = [...arg.contexts]
                        newElement.contexts = arg.contexts;
                    }
                    else {
                        newElement.contexts.push(...arg.contexts);
                    }
                }
                return;
            }
            registerMockChildContext(arg, newElement);
        });
        return newElement;
    };
    Object.assign(pushKid, element);
    Object.assign(pushKid, elementFunctions(pushKid));
    pushKid.attributes = [...element.attributes];
    pushKid.listeners = [...element.listeners];
    pushKid.allListeners = [...element.allListeners];
    return pushKid;
}
/** used during updates */
function registerMockChildContext(value, mockElm) {
    if (!mockElm.contexts) {
        mockElm.contexts = [];
    }
    mockElm.contexts.push(value);
}
//# sourceMappingURL=designElement.function.js.map