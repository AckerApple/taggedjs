// taggedjs-no-compile
import { specialAttribute } from '../../interpolations/attributes/specialAttribute.js';
import { isFunction } from '../../isInstance.js';
import { bindSubjectCallback } from '../../interpolations/attributes/bindSubjectCallback.function.js';
import { BasicTypes, ValueTypes, empty } from '../../tag/ValueTypes.enum.js';
import { paintContent } from '../paint.function.js';
import { processNonDynamicAttr } from '../../interpolations/attributes/processNameValueAttribute.function.js';
import { addOneContext } from '../index.js';
import { processAttributeFunction } from '../../interpolations/attributes/processAttributeCallback.function.js';
import { isSpecialAttr } from '../../interpolations/attributes/isSpecialAttribute.function.js';
import { processUpdateAttrContext } from './processUpdateAttrContext.function.js';
import { createDynamicArrayAttribute, createDynamicAttribute } from './createDynamicAttribute.function.js';
import { getTagJsVar } from './getTagJsVar.function.js';
import { isNoDisplayValue } from './isNoDisplayValue.function.js';
/** MAIN FUNCTION. Sets attribute value, subscribes to value updates  */
export function processAttribute(values, // all the variables inside html``
attrName, element, support, howToSet, //  = howToSetInputValue
context, isSpecial, counts, value) {
    const nameVar = getTagJsVar(attrName);
    const isNameVar = nameVar >= 0;
    if (isNameVar) {
        const value = values[nameVar];
        const contextItem = addOneContext(value, context, true);
        contextItem.isAttr = true;
        contextItem.element = element;
        contextItem.howToSet = howToSet;
        contextItem.isNameOnly = true;
        // how to process value updates
        contextItem.handler = processUpdateAttrContext;
        processNameOnlyAttrValue(values, value, element, support, howToSet, context, counts);
        return;
    }
    if (Array.isArray(value)) {
        return createDynamicArrayAttribute(attrName, value, element, context, howToSet, support, counts, values);
    }
    const valueVar = getTagJsVar(value);
    if (valueVar >= 0) {
        const value = values[valueVar];
        return createDynamicAttribute(attrName, value, element, context, howToSet, support, counts, isSpecial);
    }
    return processNonDynamicAttr(attrName, value, element, howToSet, counts, support, isSpecial);
}
export function processNameOnlyAttrValue(values, attrValue, element, ownerSupport, howToSet, context, counts) {
    if (isNoDisplayValue(attrValue)) {
        return;
    }
    // process an object of attributes ${{class:'something, checked:true}}
    if (typeof attrValue === BasicTypes.object) {
        for (const name in attrValue) {
            const value = attrValue[name];
            processAttribute(values, name, element, ownerSupport, howToSet, context, isSpecialAttr(name), // only object variables are evaluated for is special attr
            counts, value);
        }
        return;
    }
    // regular attributes
    if (attrValue.length === 0) {
        return; // ignore, do not set at this time
    }
    howToSet(element, attrValue, empty);
}
export function processAttributeEmit(newAttrValue, attrName, subject, element, support, howToSet, isSpecial, counts) {
    // should the function be wrapped so every time its called we re-render?
    if (isFunction(newAttrValue)) {
        return callbackFun(support, newAttrValue, element, attrName, isSpecial, howToSet, subject, counts);
    }
    return processAttributeSubjectValue(newAttrValue, element, attrName, isSpecial, howToSet, support, counts);
}
export function processAttributeSubjectValue(newAttrValue, element, attrName, special, howToSet, support, counts) {
    // process adding/removing style. class. (false means remove)
    if (special !== false) {
        specialAttribute(attrName, newAttrValue, element, special, // string name of special
        support, counts);
        return;
    }
    switch (newAttrValue) {
        case undefined:
        case false:
        case null:
            paintContent.push([paintContentPush, [element, attrName]]);
            return;
    }
    if (isFunction(newAttrValue)) {
        return processAttributeFunction(element, newAttrValue, support, attrName);
    }
    // value is 0
    howToSet(element, attrName, newAttrValue);
}
function callbackFun(support, newAttrValue, element, attrName, isSpecial, howToSet, subject, counts) {
    const wrapper = support.templater.wrapper;
    const tagJsType = wrapper?.tagJsType || wrapper?.original?.tagJsType;
    const oneRender = tagJsType === ValueTypes.renderOnce;
    if (!oneRender) {
        return processTagCallbackFun(subject, newAttrValue, support, attrName, element);
    }
    return processAttributeSubjectValue(newAttrValue, element, attrName, isSpecial, howToSet, support, counts);
}
export function processTagCallbackFun(subject, newAttrValue, support, attrName, element) {
    // tag has state and will need all functions wrapped to cause re-renders
    newAttrValue = bindSubjectCallback(newAttrValue, support);
    return processAttributeFunction(element, newAttrValue, support, attrName);
}
function paintContentPush(element, attrName) {
    element.removeAttribute(attrName);
}
//# sourceMappingURL=processAttribute.function.js.map