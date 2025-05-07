import { buildBeforeElement } from '../buildBeforeElement.function.js';
import { paintAppends } from '../paint.function.js';
import { checkTagValueChange } from '../index.js';
export function processReplaceTagResult(support, counts, contextItem) {
    contextItem.checkValueChange = checkTagValueChange;
    const ph = contextItem.placeholder;
    buildBeforeElement(support, counts, undefined, // element for append child
    ph);
    return support;
}
export function processFirstTagResult(support, counts, appendTo) {
    let appendIndex = paintAppends.length;
    const result = buildBeforeElement(support, counts, appendTo, undefined);
    for (const dom of result.dom) {
        if (dom.domElement) {
            paintAppends.splice(appendIndex++, 0, {
                element: dom.domElement,
                relative: appendTo,
            });
        }
        if (dom.marker) {
            paintAppends.splice(appendIndex++, 0, {
                element: dom.marker,
                relative: appendTo,
            });
        }
    }
    return support;
}
//# sourceMappingURL=processTagResult.function.js.map