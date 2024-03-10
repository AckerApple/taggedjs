import { processAttribute } from "./processAttribute.function.js";
function howToSetAttribute(element, name, value) {
    /*
    if(name === 'class'){
      value.split(' ').forEach(className => child.classList.add(className))
      return
    }
    */
    element.setAttribute(name, value);
}
function howToSetInputValue(element, name, value) {
    element[name] = value;
}
export function interpolateAttributes(child, scope, ownerTag) {
    const attrNames = child.getAttributeNames();
    let howToSet = howToSetAttribute;
    attrNames.forEach(attrName => {
        if (child.nodeName === 'INPUT' && attrName === 'value') {
            howToSet = howToSetInputValue;
        }
        const value = child.getAttribute(attrName);
        processAttribute(attrName, value, child, scope, ownerTag, howToSet);
        howToSet = howToSetAttribute; // put back
    });
}
//# sourceMappingURL=interpolateAttributes.js.map