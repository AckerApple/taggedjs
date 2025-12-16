import { paintAfters, paintContent } from "../../render/paint.function.js";
/** handles autofocus, autoselect, style., class. */
export function specialAttribute(name, value, element, specialName) {
    switch (specialName) {
        case 'autofocus':
            paintAfters.push([autofocus, [element]]);
            // element.setAttribute("autofocus", 'true')
            return;
        case 'autoselect':
            paintAfters.push([autoselect, [element]]);
            return;
        case 'style': {
            const names = name.split('.');
            paintContent.push([paintStyle, [element, names, value]]); // attribute changes should come first
            return;
        }
        case 'class':
            processSpecialClass(name, value, element);
            return;
    }
    throw new Error(`Invalid special attribute of ${specialName}. ${name}`);
}
function paintStyle(element, names, value) {
    const smallName = names[1];
    element.style[smallName] = value; // style.backgroundGround
    element.style.setProperty(smallName, value); // style.background-ground
}
function processSpecialClass(name, value, element) {
    const names = name.split('.');
    names.shift(); // remove class
    // truthy
    if (value) {
        for (const name of names) {
            paintContent.push([classListAdd, [element, name]]);
        }
        return;
    }
    // falsy
    for (const name of names) {
        paintContent.push([classListRemove, [element, name]]);
    }
}
function classListAdd(element, name) {
    element.classList.add(name);
}
function classListRemove(element, name) {
    element.classList.remove(name);
}
function autoselect(element) {
    element.select();
}
function autofocus(element) {
    element.focus();
}
//# sourceMappingURL=specialAttribute.js.map