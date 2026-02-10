// taggedjs-no-compile
import { specialAttribute } from '../../interpolations/attributes/specialAttribute.js';
import { isFunction } from '../../isInstance.js';
import { bindSubjectCallback } from '../../interpolations/attributes/bindSubjectCallback.function.js';
import { ValueTypes } from '../../tag/ValueTypes.enum.js';
import { paintContent } from '../paint.function.js';
import { processNonDynamicAttr } from '../../interpolations/attributes/processNameValueAttribute.function.js';
import { getNewContext } from '../addOneContext.function.js';
import { processAttributeFunction } from '../../interpolations/attributes/processAttributeCallback.function.js';
import { processUpdateAttrContext } from './processUpdateAttrContext.function.js';
import { createDynamicArrayAttribute, createDynamicAttribute } from './createDynamicAttribute.function.js';
import { getTagJsTag } from './getTagJsTag.function.js';
import { processStandAloneAttribute } from './processStandAloneAttribute.function.js';
import { processTagJsTagAttribute } from './processTagJsAttribute.function.js';
/** MAIN FUNCTION. Sets attribute value, subscribes to value updates  */
export function processAttribute(attrName, value, values, // all the variables inside html``
element, support, howToSet, //  = howToSetInputValue
contexts, parentContext, isSpecial) {
    const varIndex = getTagJsTag(attrName);
    let isNameVar = varIndex >= 0 || (value === undefined && typeof (attrName) !== 'string');
    let valueInValues = values[varIndex];
    // value or name from bolt?
    if (value?.tagJsType) {
        valueInValues = value; // the value is a TagJsTag
    }
    else if (attrName?.tagJsType) {
        isNameVar = true;
        valueInValues = attrName; // the name is a TagJsTag
        value = attrName;
    }
    const tagJsVar = valueInValues;
    if (tagJsVar?.tagJsType) {
        return processTagJsTagAttribute(value, [], // contexts,
        parentContext, tagJsVar, varIndex, support, attrName, element, isNameVar);
    }
    if (isNameVar) {
        // old way of setting by html``
        if (varIndex === -1 && isNameVar) {
            valueInValues = attrName; // its a name only value attribute
        }
        const contextItem = getNewContext(valueInValues, [], // contexts,
        true, parentContext);
        contextItem.valueIndex = varIndex;
        contextItem.isAttr = true;
        contextItem.target = element;
        contextItem.isNameOnly = true;
        contextItem.howToSet = howToSet;
        const TagJsTag = contextItem.tagJsVar;
        TagJsTag.processUpdate = processUpdateAttrContext;
        // single/stand alone attributes
        const aloneResult = processStandAloneAttribute(values, valueInValues, element, support, howToSet, contexts, parentContext);
        if (aloneResult) {
            contexts.push(...aloneResult);
        }
        return contextItem;
    }
    if (Array.isArray(value)) {
        return createDynamicArrayAttribute(attrName, value, element, [], // contexts,
        howToSet, values, support.context);
    }
    const valueVar = getTagJsTag(value);
    if (valueVar >= 0) {
        const value = values[valueVar];
        return createDynamicAttribute(attrName, value, element, [], // contexts,
        parentContext, howToSet, support, isSpecial, valueVar);
    }
    // simple name/value attribute
    return processNonDynamicAttr(attrName, value, element, howToSet, isSpecial, parentContext);
}
/** Only used during updates */
export function processAttributeEmit(newAttrValue, attrName, subject, element, support, howToSet, isSpecial) {
    // should the function be wrapped so every time its called we re-render?
    if (isFunction(newAttrValue)) {
        return callbackFun(support, newAttrValue, element, attrName, isSpecial, howToSet, subject);
    }
    return processAttributeSubjectValue(newAttrValue, element, attrName, isSpecial, howToSet, support);
}
/** figure out what type of attribute we are dealing with and/or feed value into handler to figure how to update */
export function processAttributeSubjectValue(newAttrValue, element, attrName, special, howToSet, support) {
    // process adding/removing style. class. (false means remove)
    if (special !== false) {
        specialAttribute(attrName, newAttrValue, element, special);
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
function callbackFun(support, newAttrValue, element, attrName, isSpecial, howToSet, _subject) {
    const wrapper = support.templater.wrapper;
    const tagJsType = wrapper?.tagJsType || wrapper?.original?.tagJsType;
    const oneRender = tagJsType === ValueTypes.renderOnce;
    if (!oneRender) {
        return processTagCallbackFun(
        // subject,
        newAttrValue, support, attrName, element);
    }
    return processAttributeSubjectValue(newAttrValue, element, attrName, isSpecial, howToSet, support);
}
export function processTagCallbackFun(
// subject: AttributeContextItem,
newAttrValue, support, attrName, element) {
    // tag has state and will need all functions wrapped to cause re-renders
    newAttrValue = bindSubjectCallback(newAttrValue, support);
    // const TagJsTag = subject.tagJsVar // = valueToTagJsVar(newAttrValue)
    // TagJsTag.processUpdate = processUpdateAttrContext
    return processAttributeFunction(element, newAttrValue, support, attrName);
}
function paintContentPush(element, attrName) {
    element.removeAttribute(attrName);
}
//# sourceMappingURL=processAttribute.function.js.map