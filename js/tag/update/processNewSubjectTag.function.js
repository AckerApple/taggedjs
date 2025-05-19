import { checkTagValueChange } from '../checkTagValueChange.function.js';
import { buildBeforeElement } from '../../render/buildBeforeElement.function.js';
import { paintAppend, paintAppends, paintBefore, paintCommands } from '../../render/paint.function.js';
import { newSupportByTemplater } from '../../render/update/processTag.function.js';
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
                    args: [appendTo, dom.marker],
                    processor: paintAppend,
                });
            }
            else {
                paintCommands.push({
                    processor: paintBefore,
                    args: [insertBefore, dom.marker],
                });
            }
        }
        if (dom.domElement) {
            if (appendTo) {
                paintAppends.push({
                    args: [appendTo, dom.domElement],
                    processor: paintAppend,
                });
            }
            else {
                paintCommands.push({
                    processor: paintBefore,
                    args: [insertBefore, dom.domElement],
                });
            }
        }
    }
    return support;
}
//# sourceMappingURL=processNewSubjectTag.function.js.map