import { inputAttribute } from "./inputAttribute.js";
import { isSubjectInstance } from "./isInstance.js";
const startRegX = /^\s*{__tagVar/;
const endRegX = /}\s*$/;
export function interpolateAttributes(child, scope, ownerTag) {
    const attrNames = child.getAttributeNames();
    const isTextArea = child.nodeName === 'TEXTAREA';
    if (isTextArea && !attrNames.includes('value')) {
        const value = child.getAttribute('textVarValue'); // (child as any).value
        processAttribute('textVarValue', value, child, scope, ownerTag, (name, value) => child.value = value);
    }
    attrNames.forEach(attrName => {
        const value = child.getAttribute(attrName);
        processAttribute(attrName, value, child, scope, ownerTag, (name, value) => child.setAttribute(name, value));
    });
}
/** Looking for (class | style) followed by a period */
export function isSpecialAttr(attrName) {
    return attrName.search(/^(class|style)(\.)/) >= 0;
}
function processAttribute(attrName, value, child, scope, ownerTag, howToSet) {
    const isSpecial = isSpecialAttr(attrName);
    // An attempt to replicate React
    if (value && value.search(startRegX) >= 0 && value.search(endRegX) >= 0) {
        // get the code inside the brackets like "variable0" or "{variable0}"
        const code = value.replace('{', '').split('').reverse().join('').replace('}', '').split('').reverse().join('');
        const result = scope[code];
        // attach as callback
        if (result instanceof Function) {
            ;
            child[attrName] = function (...args) {
                return result(child, args);
            };
            return;
        }
        if (isSubjectInstance(result)) {
            child.removeAttribute(attrName);
            const callback = (newAttrValue) => {
                if (newAttrValue instanceof Function) {
                    ;
                    child[attrName] = function (...args) {
                        return newAttrValue(child, args);
                    };
                    child[attrName].tagFunction = newAttrValue;
                    return;
                }
                if (isSpecial) {
                    inputAttribute(attrName, newAttrValue, child);
                    return;
                }
                if (newAttrValue) {
                    howToSet(attrName, newAttrValue);
                    // child.setAttribute(attrName, newAttrValue)
                    return;
                }
                const isDeadValue = newAttrValue === undefined || newAttrValue === false || newAttrValue === null;
                if (isDeadValue) {
                    child.removeAttribute(attrName);
                    return;
                }
                // value is 0
                howToSet(attrName, newAttrValue);
                // child.setAttribute(attrName, newAttrValue)
            };
            const sub = result.subscribe(callback);
            ownerTag.cloneSubs.push(sub); // this is where unsubscribe is picked up
            // child.setAttribute(attrName, result.value)
            // callback(result.value)
            return;
        }
        howToSet(attrName, result.value);
        // child.setAttribute(attrName, result.value)
        return;
    }
    // Non dynamic
    if (isSpecial) {
        return inputAttribute(attrName, value, child);
    }
}
//# sourceMappingURL=interpolateAttributes.js.map