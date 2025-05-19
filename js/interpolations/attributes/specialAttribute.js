import { paintAfters, paintContent } from "../../render/paint.function.js";
/** handles init, destroy, autofocus, autoselect, style., class. */
export function specialAttribute(name, value, element, specialName, support, counts) {
    switch (specialName) {
        // case 'oninit' as any:
        case 'init': {
            const stagger = counts.added;
            // run delayed after elements placed down
            paintAfters.push(function paintSpecialAttribute() {
                const event = {
                    target: element,
                    stagger,
                };
                value(event); // call init/oninit
            });
            return;
        }
        case 'destroy': {
            const stagger = ++counts.removed;
            const global = support.subject.global;
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
            paintAfters.push(() => element.focus());
            return;
        case 'autoselect':
            paintAfters.push(() => element.select());
            return;
        case 'style': {
            const names = name.split('.');
            paintContent.push(() => element.style[names[1]] = value); // attribute changes should come first
            return;
        }
        case 'class':
            processSpecialClass(name, value, element);
            return;
    }
    throw new Error(`Invalid special attribute of ${specialName}. ${name}`);
}
function processSpecialClass(name, value, element) {
    const names = name.split('.');
    names.shift(); // remove class
    // truthy
    if (value) {
        for (const name of names) {
            paintContent.push(() => element.classList.add(name));
        }
        return;
    }
    // falsy
    for (const name of names) {
        paintContent.push(() => element.classList.remove(name));
    }
}
//# sourceMappingURL=specialAttribute.js.map