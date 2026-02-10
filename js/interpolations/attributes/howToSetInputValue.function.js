import { isObject } from "../../index.js";
import { paintContent } from "../../render/paint.function.js";
// Maybe more performant for updates but seemingly slower for first renders
export function howToSetInputValue(element, name, value) {
    if (isObject(value)) {
        return howToSetInputObjectValue(element, name, value);
    }
    paintContent.push([setNonFunctionInputValue, [element, name, value]]);
}
function howToSetInputObjectValue(element, name, value) {
    if (typeof element[name] !== 'object') {
        element[name] = {};
    }
    // Handle object values by setting properties directly
    for (const key in value) {
        const subValue = value[key];
        paintContent.push([setObjectValue, [element, name, key, subValue]]);
    }
    if (element[name].setProperty) {
        for (const key in value) {
            const subValue = value[key];
            paintContent.push([setPropertyValue, [element, name, key, subValue]]);
        }
    }
}
/* used for <input checked /> */
export function howToSetStandAloneAttr(element, name, _value) {
    element.setAttribute(name, '');
}
export function setNonFunctionInputValue(element, name, value) {
    if (isObject(value)) {
        return howToSetInputObjectValue(element, name, value);
    }
    setSimpleAttribute(element, name, value);
}
/** used for checked, selected, and so on */
export function setBooleanAttribute(element, name, value) {
    if (value) {
        element[name] = true;
    }
    else {
        element[name] = false;
    }
}
export function setSimpleAttribute(element, name, value) {
    // for checked=true
    ;
    element[name] = value;
    if (value === undefined || value === false || value === null) {
        element.removeAttribute(name);
        return;
    }
    element.setAttribute(name, value);
    /*
    paintAfters.push([(element: HTMLInputElement) => {
      element.value = value as string
    }, [element]])
    */
}
function setPropertyValue(element, name, key, value) {
    ;
    element[name].setProperty(key, value);
}
/** main processor for things like <div style=${{ maxWidth: '100vw' }}> */
function setObjectValue(element, name, key, value) {
    ;
    element[name][key] = value;
}
//# sourceMappingURL=howToSetInputValue.function.js.map