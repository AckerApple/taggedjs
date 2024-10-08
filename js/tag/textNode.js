import { empty } from "./ValueTypes.enum.js";
export const textNode = document === undefined ? getTestTextNode() : document.createTextNode(empty);
function getTestTextNode() {
    return {
        textContent: empty,
        cloneNode: (_children) => getTestTextNode()
    };
}
//# sourceMappingURL=textNode.js.map