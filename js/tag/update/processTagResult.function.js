import { buildBeforeElement } from '../../render/buildBeforeElement.function.js';
import { paintAppend, paintAppends } from '../../render/paint.function.js';
export function processReplaceTagResult(support, counts, contextItem) {
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
            paintAppends.splice(appendIndex++, 0, [paintAppend, [appendTo, dom.domElement]]);
        }
        if (dom.marker) {
            paintAppends.splice(appendIndex++, 0, [paintAppend, [appendTo, dom.marker]]);
        }
    }
    return support;
}
//# sourceMappingURL=processTagResult.function.js.map