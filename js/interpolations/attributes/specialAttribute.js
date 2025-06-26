import { paintAfters, paintContent } from "../../render/paint.function.js";
/** handles init, destroy, autofocus, autoselect, style., class. */
export function specialAttribute(name, value, element, specialName, support, counts) {
    switch (specialName) {
        case 'init': { // aka oninit
            const stagger = counts.added++;
            // run delayed after elements placed down
            paintAfters.push([paintSpecialAttribute, [element, stagger, value]]);
            return;
        }
        case 'destroy': { // aka ondestroy
            const stagger = counts.removed++;
            const global = support.context.global;
            global.destroys = global.destroys || [];
            global.destroys.push(() => {
                const event = {
                    target: element,
                    stagger,
                };
                return value(event); // call destroy/ondestroy
            });
            return;
        }
        case 'autofocus':
            paintAfters.push([autofocus, [element]]);
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
    element.style[smallName] = value;
    element.style.setProperty(smallName, value);
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
function paintSpecialAttribute(element, stagger, value) {
    const event = {
        target: element,
        stagger,
    };
    value(event); // call init/oninit
}
//# sourceMappingURL=specialAttribute.js.map