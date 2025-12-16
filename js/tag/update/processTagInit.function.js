import { processTag } from '../../render/update/processTag.function.js';
import { processNewSubjectTag } from './processNewSubjectTag.function.js';
export function processTagInit(value, contextItem, ownerSupport, insertBefore, appendTo) {
    contextItem.state = {};
    if (appendTo) {
        return processNewSubjectTag(value, contextItem, ownerSupport, appendTo, insertBefore);
    }
    return processTag(ownerSupport, contextItem);
}
//# sourceMappingURL=processTagInit.function.js.map