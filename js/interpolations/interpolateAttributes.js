import { paintAwaits } from "../tag/paint.function.js";
export function howToSetInputValue(element, name, value) {
    paintAwaits.push(() => element.setAttribute(name, value));
}
//# sourceMappingURL=interpolateAttributes.js.map