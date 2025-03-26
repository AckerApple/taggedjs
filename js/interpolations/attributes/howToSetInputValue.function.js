import { paintContent } from "../../tag/paint.function.js";
// Maybe more performant for updates but seemingly slower for first renders
export function howToSetInputValue(element, name, value) {
    paintContent.push(() => {
        howToSetFirstInputValue(element, name, value);
    });
}
export function howToSetFirstInputValue(element, name, value) {
    if (value === undefined || value === false || value === null) {
        element.removeAttribute(name);
        return;
    }
    element.setAttribute(name, value);
}
//# sourceMappingURL=howToSetInputValue.function.js.map