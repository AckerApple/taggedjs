import { checkTagValueChange } from '../checkTagValueChange.function.js';
import { processTag } from './processTag.function.js';
import { processNewSubjectTag } from './processNewSubjectTag.function.js';
export function processTagInit(value, contextItem, ownerSupport, counts, appendTo, insertBefore) {
    contextItem.checkValueChange = checkTagValueChange;
    if (appendTo) {
        return processNewSubjectTag(value, contextItem, ownerSupport, counts, appendTo, insertBefore);
    }
    return processTag(ownerSupport, contextItem, counts);
}
//# sourceMappingURL=processTagInit.function.js.map