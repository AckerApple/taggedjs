import { isFunction, isObject } from '../index.js';
import { setBooleanAttribute, setNonFunctionInputValue, setSimpleAttribute } from '../interpolations/attributes/howToSetInputValue.function.js';
import { getPushKid } from './htmlTag.function.js';
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
    const clone = getPushKid(item, item.elementFunctions);
    clone.attributes.push(args);
    if (isValueForContext(args[0])) {
        registerMockAttrContext(args[0], clone); // the attrName is a function or TagJsVar
    }
    else if (isValueForContext(args[1])) {
        registerMockAttrContext(args[1], clone); // the attrValue is a function or TagJsVar
    }
    return clone;
}
function attr2(item, args) {
    // const clone = getPushKid(item as any, item.elementFunctions)
    // clone.attributes.push(args as Attribute)
    item.attributes.push(args);
    if (isValueForContext(args[0])) {
        registerMockAttrContext(args[0], item); // the attrName is a function or TagJsVar
    }
    else if (isValueForContext(args[1])) {
        registerMockAttrContext(args[1], item); // the attrValue is a function or TagJsVar
    }
    return item;
}
export function elementFunctions(item) {
    /** Used for all element callbacks */
    function makeCallback(eventName) {
        return function (callback) {
            return callbackWrapper(item, eventName, callback);
        };
    }
    // TODO: This maybe the old way of doing things (see callables)
    const callables_other = {
        // ...eventCallables,
        onClose: makeCallback('onclose'),
        onDoubleClick: makeCallback('ondblclick'),
        onClick: makeCallback('click'),
        // onclick: makeCallback('click'),
        // click: makeCallback('click'),
        onBlur: makeCallback('onblur'),
        onChange: makeCallback('onchange'),
        // onchange: makeCallback('onchange'),
        // change: makeCallback('onchange'),
        onMousedown: makeCallback('onmousedown'),
        onMouseup: makeCallback('onmouseup'),
        onKeydown: makeCallback('onkeydown'),
        onKeyup: makeCallback('onkeyup'),
        // onkeyup: makeCallback('onkeyup'),
        // keyup: makeCallback('onkeyup'),
        /* apply attribute via attr(name: string, value?: any): **/
        attr: (...args) => attr(item, args),
        /** Used for setting array index-key value */
        key: function (arrayValue) {
            ;
            this.arrayValue = arrayValue;
            return this;
        },
    };
    return callables_other;
}
function setClassValue(element, name, value) {
    if (isObject(value)) {
        Object.entries(value).forEach(([name, value]) => {
            if (value) {
                element.classList.add(name);
            }
            else {
                element.classList.remove(name);
            }
        });
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
const eventCallables = {
    onClose: makeCallback('onclose'),
    onClick: makeCallback('click'),
    onDoubleClick: makeCallback('ondblclick'),
    onDblClick: makeCallback('ondblclick'),
    onBlur: makeCallback('onblur'),
    onChange: makeCallback('onchange'),
    onMousedown: makeCallback('onmousedown'),
    onMouseDown: makeCallback('onmousedown'),
    onMouseup: makeCallback('onmouseup'),
    onMouseUp: makeCallback('onmouseup'),
    onKeyup: makeCallback('onkeyup'),
    onKeyUp: makeCallback('onkeyup'),
    onKeydown: makeCallback('onkeydown'),
    onKeyDown: makeCallback('onkeydown'),
};
const callables = {
    checked: setupAttr('checked', setBooleanAttribute),
    selected: setupAttr('selected', setBooleanAttribute),
    /** element.setAttribute('style', x)  */
    class: setupAttr('class', setClassValue),
    ...eventCallables
};
export function loopObjectAttributes(item, object) {
    const result = Object.entries(object).reduce((all, [name, value]) => {
        if (name in callables) {
            return callables[name](item, value);
        }
        return attr2(item, [name, value, false, setNonFunctionInputValue]);
    }, item);
    return result;
}
//# sourceMappingURL=elementFunctions.js.map