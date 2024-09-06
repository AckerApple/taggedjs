import { paintAwaits } from "../tag/paint.function.js";
const style = 'style';
const classS = 'class';
export function specialAttribute(name, value, element) {
    const names = name.split('.');
    const firstName = names[0];
    // style.position = "absolute"
    if (firstName === style) {
        paintAwaits.push(() => element.style[names[1]] = value); // attribute changes should come first
        return;
    }
    // Example: class.width-full = "true"
    if (firstName === classS) {
        names.shift();
        // truthy
        if (value) {
            for (const name of names) {
                /*
                if(element.classList.contains(name)) {
                  continue
                }
                */
                paintAwaits.push(() => element.classList.add(name));
            }
            return;
        }
        // falsy
        for (const name of names) {
            paintAwaits.push(() => element.classList.remove(name));
        }
    }
}
//# sourceMappingURL=specialAttribute.js.map