import { variableSuffix, variablePrefix } from "../../tag/Tag.class.js";
export const safeVar = '__safeTagVar';
export function restorePlaceholders(elements) {
    elements.forEach(traverseAndRestore);
}
const safeReplacer = /__safeTagVar(\d+)/g;
function traverseAndRestore(element) {
    if ('attributes' in element) {
        element.attributes = element.attributes.map(attr => {
            if (attr.length === 1) {
                return attr;
            }
            let [key, value] = attr;
            if (typeof value === 'string' && value.startsWith(safeVar)) {
                const index = parseInt(value.replace(safeVar, ''), 10);
                value = variablePrefix + index + variableSuffix;
            }
            return [key, value];
        });
    }
    if ('children' in element) {
        const children = element.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child.nodeName === 'text') {
                if (typeof child.textContent !== 'string') {
                    return;
                }
                child.textContent = child.textContent.replace(safeReplacer, (match, index) => variablePrefix + index + variableSuffix);
            }
            traverseAndRestore(child);
        }
        // Remove empty children array
        if (children.length === 0) {
            delete element.children;
        }
    }
}
//# sourceMappingURL=restorePlaceholders.function.js.map