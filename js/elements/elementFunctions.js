import { isFunction, isObject } from '../index.js';
import { setBooleanAttribute, setNonFunctionInputValue, setSimpleAttribute } from '../interpolations/attributes/howToSetInputValue.function.js';
import { getPushKid } from './htmlTag.function.js';
import { makeAttrCallable } from './attributeCallables.js';
import { ATTRIBUTE_CALLABLE_DEFS } from './elementAttributes.array.js';
function callbackWrapper(item, eventName, callback) {
    const clone = getPushKid(item, item.elementFunctions);
    return callbackWrapper2(clone, eventName, callback);
}
function callbackWrapper2(item, eventName, callback) {
    function wrapCallback(e) {
        return wrapCallback.toCallback(e);
    }
    wrapCallback.toCallback = callback;
    item.listeners.push([eventName, wrapCallback]);
    item.allListeners.push([eventName, wrapCallback]);
    return item;
}
function attr(item, args) {
    // return processSetAttribute(args[0], args[1], item)
    // processSetAttribute(args[0], args[1], item)
    const clone = getPushKid(item, item.elementFunctions);
    processSetAttribute(args[0], args[1], clone);
    return clone;
}
/** attrs({names: values}) */
function attrs(item, args) {
    const clone = getPushKid(item, item.elementFunctions);
    for (const name in args) {
        if (!Object.prototype.hasOwnProperty.call(args, name)) {
            continue;
        }
        const value = args[name];
        clone.attributes.push([name, value]);
        bumpContentId(clone, value);
        if (isValueForContext(name)) {
            registerMockAttrContext(name, clone); // the attrName is a function or TagJsTag
        }
        else if (isValueForContext(value)) {
            registerMockAttrContext(value, clone); // the attrValue is a function or TagJsTag
        }
    }
    return clone;
}
const attributeCallableHandlers = Object.fromEntries(ATTRIBUTE_CALLABLE_DEFS.map(([apiName, attrName]) => [apiName, makeAttrCallable(attrName, attr)]));
const ELEMENT_EVENT_DEFS = [
    ['onClose', 'onclose'],
    ['onCancel', 'oncancel'],
    ['onDoubleClick', 'ondblclick'],
    ['onClick', 'click'],
    ['onBlur', 'onblur'],
    ['onChange', 'onchange'],
    ['onInput', 'oninput'],
    ['contextMenu', 'contextmenu'],
    ['onMouseDown', 'onmousedown'],
    ['onMouseUp', 'onmouseup'],
    ['onMouseOver', 'onmouseover'],
    ['onMouseOut', 'onmouseout'],
    ['onKeyDown', 'onkeydown'],
    ['onKeyUp', 'onkeyup'],
];
function attr2(item, args) {
    item.attributes.push(args);
    bumpContentId(item, args[1]);
    if (isValueForContext(args[0])) {
        registerMockAttrContext(args[0], item); // the attrName is a function or TagJsTag
    }
    else if (isValueForContext(args[1])) {
        registerMockAttrContext(args[1], item); // the attrValue is a function or TagJsTag
    }
    return item;
}
const sharedElementFunctionMembers = (() => {
    const eventCallables = Object.fromEntries(ELEMENT_EVENT_DEFS.map(([apiName, eventName]) => [
        apiName,
        function thisEventCallable(callback) {
            return callbackWrapper(this, eventName, callback);
        },
    ]));
    const attributeCallables = Object.fromEntries(Object.entries(attributeCallableHandlers).map(([apiName, handler]) => [apiName, makeAttr(handler)]));
    // element ids can act as array keys
    const ogId = attributeCallables.id;
    attributeCallables.id = function thisIdCallable(...args) {
        const first = args[0];
        this.arrayValue = typeof first === 'function' ? first() : first;
        return ogId.apply(this, args);
    };
    return {
        ...eventCallables,
        /* apply attribute via attr(name: string, value?: any): **/
        attr: function thisAttr(...args) {
            return attr(this, args);
        },
        attrs: function thisAttrs(attributes) {
            return attrs(this, attributes);
        },
        /** Used for setting array index-key value */
        key: function (arrayValue) {
            ;
            this.arrayValue = arrayValue;
            return this;
        },
        ...attributeCallables,
    };
})();
export function elementFunctions(_item) {
    return sharedElementFunctionMembers;
}
function bumpContentId(item, attrValue) {
    let bump = 1;
    if (attrValue != null && typeof attrValue !== 'function' && typeof attrValue.length === 'number') {
        bump += attrValue.length;
    }
    item.contentId += bump;
}
function makeAttr(handler) {
    return (function attrCallable(stringsOrValue, ...values) {
        return handler(this, stringsOrValue, values);
    });
}
function setClassValue(element, name, value) {
    if (isObject(value)) {
        for (const className in value) {
            if (!Object.prototype.hasOwnProperty.call(value, className)) {
                continue;
            }
            const classValue = value[className];
            if (classValue) {
                element.classList.add(className);
            }
            else {
                element.classList.remove(className);
            }
        }
        return; // howToSetInputObjectValue(element, name, value as Record<string, any>)
    }
    setSimpleAttribute(element, name, value);
}
/** used during updates */
export function registerMockAttrContext(value, mockElm) {
    if (!mockElm.contexts) {
        mockElm.contexts = [];
    }
    mockElm.contexts.push(value);
    ++mockElm.contentId;
}
export function isValueForContext(value) {
    return Array.isArray(value) || isFunction(value) || value?.tagJsType;
}
function setupAttr(attrName, howToSet) {
    return (item, value) => attr2(item, [attrName, value, false, howToSet]);
}
function makeCallback(eventName) {
    return (item, callback) => {
        return callbackWrapper2(item, eventName, callback);
    };
}
const objectAttrEventCallables = Object.fromEntries([
    ['onClick', makeCallback('click')],
    ['onDoubleClick', makeCallback('ondblclick')],
    ['onDblClick', makeCallback('ondblclick')],
    ['onDblClick', makeCallback('ondblclick')],
    ['onBlur', makeCallback('onblur')],
    ['onChange', makeCallback('onchange')],
    ['onCancel', makeCallback('oncancel')],
    ['onClose', makeCallback('onclose')],
    ['onInput', makeCallback('oninput')],
    ['onMousedown', makeCallback('onmousedown')],
    ['onMouseDown', makeCallback('onmousedown')],
    ['onMouseup', makeCallback('onmouseup')],
    ['onMouseUp', makeCallback('onmouseup')],
    ['onMouseover', makeCallback('onmouseover')],
    ['onMouseOver', makeCallback('onmouseup')],
    ['onMouseout', makeCallback('onmouseout')],
    ['onMouseOut', makeCallback('onmouseout')],
    ['onKeyup', makeCallback('onkeyup')],
    ['onKeyUp', makeCallback('onkeyup')],
    ['onKeydown', makeCallback('onkeydown')],
    ['onKeyDown', makeCallback('onkeydown')],
]);
const callables = Object.assign(Object.fromEntries(['checked', 'disabled', 'selected'].map(attrName => [attrName, setupAttr(attrName, setBooleanAttribute)])), {
    /** element.setAttribute('style', x)  */
    class: setupAttr('class', setClassValue),
}, objectAttrEventCallables);
export function loopObjectAttributes(item, object) {
    for (const name in object) {
        if (!Object.prototype.hasOwnProperty.call(object, name)) {
            continue;
        }
        processSetAttribute(name, object[name], item);
    }
    return item;
}
function processSetAttribute(name, value, item) {
    if (name in callables) {
        return callables[name](item, value);
    }
    return attr2(item, [name, value, false, setNonFunctionInputValue]);
}
//# sourceMappingURL=elementFunctions.js.map