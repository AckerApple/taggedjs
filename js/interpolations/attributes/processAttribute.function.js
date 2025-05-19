// taggedjs-no-compile
import { specialAttribute } from './specialAttribute.js';
import { isFunction, isObject, isSubjectInstance } from '../../isInstance.js';
import { bindSubjectCallback } from './bindSubjectCallback.function.js';
import { BasicTypes, ValueTypes, empty } from '../../tag/ValueTypes.enum.js';
import { paintContent } from '../../render/paint.function.js';
import { processDynamicNameValueAttribute, processNonDynamicAttr } from './processNameValueAttribute.function.js';
import { addOneContext } from '../../render/index.js';
import { processAttributeFunction } from './processAttributeCallback.function.js';
import { isSpecialAttr } from './isSpecialAttribute.function.js';
import { processUpdateAttrContext } from '../../tag/processUpdateAttrContext.function.js';
import { blankHandler } from '../optimizers/attachDomElements.function.js';
/** MAIN FUNCTION. Sets attribute value, subscribes to value updates  */
export function processAttribute(values, attrName, element, support, howToSet, //  = howToSetInputValue
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
    const valueVar = getTagJsVar(value);
    if (valueVar >= 0) {
        const value = values[valueVar];
        const contextItem = {
            isAttr: true,
            element,
            attrName: attrName,
            // checkValueChange: undefined as any,
            // delete: undefined as any,
            withinOwnerElement: true,
        };
        context.push(contextItem);
        /*
            const isSubject = isSubjectInstance(contextItem.value)
            if ( isSubject ) {
              return processNameValueAttributeAttrSubject(
                attrName as string,
                contextItem,
                element,
                support,
                howToSet,
                isSpecial,
                counts,
              )
            }
        */
        contextItem.handler = processUpdateAttrContext;
        processDynamicNameValueAttribute(attrName, value, contextItem, element, howToSet, support, counts, isSpecial);
        contextItem.value = value;
        return;
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
/** Processor for flat attributes and object attributes */
function processNameValueAttributeAttrSubject(attrName, contextItem, element, support, howToSet, isSpecial, counts) {
    if (isSpecial) {
        paintContent.push(function paintContent() {
            element.removeAttribute(attrName);
        });
    }
    const contextValueSubject = contextItem.value;
    if (isSubjectInstance(contextValueSubject)) {
        contextItem.handler = blankHandler;
        const callback = function processAttrCallback(newAttrValue) {
            processAttributeEmit(newAttrValue, attrName, contextItem, element, support, howToSet, isSpecial, counts);
        };
        // 🗞️ Subscribe. Above callback called immediately since its a ValueSubject()
        const sub = contextValueSubject.subscribe(callback);
        // Record subscription for later unsubscribe when element destroyed
        const global = contextItem.global;
        const subs = global.subscriptions = global.subscriptions || [];
        subs.push(sub);
    }
    processAttributeEmit(contextItem.value, attrName, contextItem, element, support, howToSet, isSpecial, counts);
    return;
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
            paintContent.push(function paintContentPush() {
                element.removeAttribute(attrName);
            });
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
function getTagJsVar(attrPart) {
    if (isObject(attrPart) && 'tagJsVar' in attrPart)
        return attrPart.tagJsVar;
    return -1;
    // return (attrPart as TagVarIdNum)?.tagJsVar || -1
}
export function isNoDisplayValue(attrValue) {
    return undefined === attrValue || null === attrValue || false === attrValue;
}
//# sourceMappingURL=processAttribute.function.js.map