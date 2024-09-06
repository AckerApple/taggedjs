import { specialAttribute } from './specialAttribute.js';
import { isSubjectInstance } from '../isInstance.js';
import { howToSetInputValue } from './interpolateAttributes.js';
import { bindSubjectCallback } from './bindSubjectCallback.function.js';
import { ImmutableTypes, ValueTypes, empty } from '../tag/ValueTypes.enum.js';
import { paint, paintAwaits } from '../tag/paint.function.js';
const INPUT = 'INPUT';
const valueS = 'value';
const ondoubleclick = 'ondoubleclick';
/** Sets attribute value, subscribes to value updates  */
export function processAttribute(attrs, element, support, howToSet = howToSetInputValue) {
    const attrName = attrs[0];
    const value = attrs[1];
    const isNameVar = attrs.length === 1; // isTagVar(attrName)
    if (isNameVar) {
        return processNameOnlyAttr(support, attrName, element, howToSet);
    }
    const isSubject = value && isSubjectInstance(value);
    // const isSubject = isTagVar(value)
    if (isSubject) {
        return processNameValueAttrSubject(attrName, value, element, support, howToSet);
    }
    processNameValue(attrName, value, element, howToSet);
}
export function processNameValue(attrName, value, element, howToSet) {
    // Non dynamic
    const isSpecial = isSpecialAttr(attrName);
    // TODO: enhance this condition
    const global = value?.global;
    if (global) {
        global.attrName = attrName;
        global.element = element;
        global.howToSet = howToSet;
        global.isSpecial = isSpecial;
    }
    if (isSpecial) {
        return specialAttribute(attrName, value, element);
    }
    howToSet(element, attrName, value);
}
function processNameOnlyAttr(support, attrName, element, howToSet) {
    const contextValue = attrName;
    contextValue.global.element = element;
    contextValue.global.howToSet = howToSet;
    contextValue.global.isNameOnly = true;
    paintAwaits.push(() => element.removeAttribute(attrName));
    // the above callback gets called immediately since its a ValueSubject()
    const contextValueSubject = contextValue.value;
    if (isSubjectInstance(contextValueSubject)) {
        const sub = contextValueSubject.subscribe((value) => {
            processNameOnlyEmit(value, support, contextValue, element, howToSet);
            if (!contextValueSubject.global.madeByTagJs) {
                paint();
            }
        });
        support.subject.global.subscriptions.push(sub); // this is where unsubscribe is picked up
        return;
    }
    processNameOnlyEmit(contextValue.value, support, contextValue, element, howToSet);
    return;
}
export function processNameOnlyEmit(value, support, subject, element, howToSet) {
    if (value === support.subject.global.lastValue) {
        return; // value did not change
    }
    processNameOnlyAttrValue(value, subject.global.lastValue, element, support, howToSet);
    subject.global.lastValue = value;
}
function processNameOnlyAttrValue(attrValue, lastValue, element, ownerSupport, howToSet) {
    // check to remove previous attribute(s)
    if (lastValue) {
        if (lastValue instanceof Object) {
            const isObStill = attrValue instanceof Object;
            if (isObStill) {
                for (const name in lastValue) {
                    if (name in attrValue) {
                        continue;
                    }
                    paintAwaits.push(() => element.removeAttribute(name));
                    // delete element[name]
                }
            }
            else {
                for (const name in lastValue) {
                    paintAwaits.push(() => element.removeAttribute(name));
                    // delete element[name]
                }
            }
        }
    }
    // regular attributes
    if (typeof (attrValue) === ImmutableTypes.string) {
        if (!attrValue.length) {
            return; // ignore, do not set at this time
        }
        howToSet(element, attrValue, empty);
        return;
    }
    // process an object of attributes ${{class:'something, checked:true}}
    if (attrValue instanceof Object) {
        for (const name in attrValue) {
            processAttribute([name, attrValue[name]], element, ownerSupport, howToSet);
        }
    }
}
/** Processor for flat attributes and object attributes */
function processNameValueAttrSubject(attrName, result, element, support, howToSet) {
    const isSpecial = isSpecialAttr(attrName);
    if (isSpecial) {
        paintAwaits.push(() => element.removeAttribute(attrName));
    }
    const contextValueSubject = result.value;
    if (isSubjectInstance(contextValueSubject)) {
        const callback = (newAttrValue) => {
            processAttributeEmit(isSpecial, newAttrValue, attrName, result, element, support, howToSet);
        };
        // 🗞️ Subscribe. Above callback called immediately since its a ValueSubject()
        const sub = contextValueSubject.subscribe(callback);
        // Record subscription for later unsubscribe when element destroyed
        result.global.subscriptions.push(sub);
    }
    processAttributeEmit(isSpecial, result.value, attrName, result, element, support, howToSet);
    return;
}
export function processAttributeEmit(isSpecial, newAttrValue, attrName, result, element, support, howToSet) {
    // should the function be wrapped so every time its called we re-render?
    if (newAttrValue instanceof Function) {
        return callbackFun(support, newAttrValue, element, attrName, isSpecial, howToSet, result);
    }
    return processAttributeSubjectValue(newAttrValue, element, attrName, isSpecial, howToSet, support, result);
}
export function processAttributeSubjectValue(newAttrValue, element, attrName, isSpecial, howToSet, support, subject) {
    if (newAttrValue instanceof Function) {
        const fun = function (...args) {
            return fun.tagFunction(element, args);
        };
        // access to original function
        fun.tagFunction = newAttrValue;
        fun.support = support;
        // shorthand corrections
        if (attrName === ondoubleclick) {
            attrName = 'ondblclick';
        }
        console.log('funfunfun', attrName, fun);
        element[attrName] = fun;
        return;
    }
    // its already the same value
    if (subject.global.lastValue === newAttrValue) {
        return subject.global.lastValue;
    }
    subject.global.lastValue = newAttrValue;
    if (isSpecial) {
        specialAttribute(attrName, newAttrValue, element);
        return;
    }
    const isDeadValue = [undefined, false, null].includes(newAttrValue);
    if (isDeadValue) {
        paintAwaits.push(() => element.removeAttribute(attrName));
        return;
    }
    // value is 0
    howToSet(element, attrName, newAttrValue);
}
/** Looking for (class | style) followed by a period */
function isSpecialAttr(attrName) {
    return attrName.search(/^(class|style)(\.)/) >= 0;
}
function callbackFun(support, newAttrValue, element, attrName, isSpecial, howToSet, subject) {
    const wrapper = support.templater.wrapper;
    const parentWrap = wrapper?.parentWrap;
    const tagJsType = wrapper?.tagJsType || parentWrap?.tagJsType;
    const oneRender = tagJsType === ValueTypes.oneRender;
    if (!oneRender) {
        const prevFun = subject.global.lastValue;
        if (prevFun && prevFun.tagFunction && prevFun.support) {
            newAttrValue = prevFun;
            prevFun.tagFunction = newAttrValue;
            prevFun.support = support;
            return prevFun;
        }
        // tag has state and will need all functions wrapped to cause re-renders
        newAttrValue = bindSubjectCallback(newAttrValue, support);
        console.log('bind', attrName, { newAttrValue });
    }
    return processAttributeSubjectValue(newAttrValue, element, attrName, isSpecial, howToSet, support, subject);
}
//# sourceMappingURL=processAttribute.function.js.map