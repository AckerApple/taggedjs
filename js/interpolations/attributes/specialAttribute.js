import { paintAfters, paintContent } from "../../tag/paint.function.js";
export function specialAttribute(name, value, element, specialName) {
    switch (specialName) {
        case 'oninit':
        case 'init':
            paintAfters.push(() => {
                const event = { target: element, stagger: 0 };
                const onInit = value;
                onInit(event);
            });
            return;
        case 'autofocus':
            paintAfters.push(() => element.focus());
            return;
        case 'autoselect':
            paintAfters.push(() => element.select());
            return;
        case 'style': {
            const names = name.split('.');
            // names.shift() // remove 'style'
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