import { subscribeToTemplate } from '../../interpolations/subscribeToTemplate.function.js';
import { checkTagValueChange } from '../checkTagValueChange.function.js';
import { buildBeforeElement } from '../buildBeforeElement.function.js';
import { paintAppends, paintInsertBefores } from '../paint.function.js';
import { newSupportByTemplater } from './processTag.function.js';
export function processNewSubjectTag(templater, subject, // could be tag via result.tag
ownerSupport, // owner
counts, appendTo, insertBefore) {
    subject.checkValueChange = checkTagValueChange;
    const support = newSupportByTemplater(templater, ownerSupport, subject);
    support.ownerSupport = ownerSupport;
    const result = buildBeforeElement(support, counts, appendTo, appendTo ? undefined : insertBefore);
    for (const dom of result.dom) {
        if (dom.marker) {
            if (appendTo) {
                paintAppends.push({
                    element: dom.marker,
                    relative: appendTo, // ph.parentNode as Element,
                });
            }
            else {
                paintInsertBefores.push({
                    element: dom.marker,
                    relative: insertBefore, // ph.parentNode as Element,
                });
            }
        }
        if (dom.domElement) {
            /*
            paintAppends.push({
              element: dom.domElement,
              relative: appendTo as Element, // ph.parentNode as Element,
            })
            */
            if (appendTo) {
                paintAppends.push({
                    element: dom.domElement,
                    relative: appendTo, // ph.parentNode as Element,
                });
            }
            else {
                paintInsertBefores.push({
                    element: dom.domElement,
                    relative: insertBefore, // ph.parentNode as Element,
                });
            }
        }
    }
    let index = -1;
    const length = result.subs.length - 1;
    //++painting.locks
    while (index++ < length) {
        const sub = result.subs[index];
        subscribeToTemplate(sub);
    }
    return support;
}
//# sourceMappingURL=processNewSubjectTag.function.js.map