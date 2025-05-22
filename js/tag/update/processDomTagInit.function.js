import { newSupportByTemplater, processTag, tagFakeTemplater } from '../../render/update/processTag.function.js';
import { getNewGlobal } from './getNewGlobal.function.js';
import { processNewSubjectTag } from './processNewSubjectTag.function.js';
export function processDomTagInit(value, // StringTag,
contextItem, // could be tag via result.tag
ownerSupport, // owningSupport
counts, // {added:0, removed:0}
appendTo, insertBefore) {
    const tag = value;
    let templater = tag.templater;
    if (!templater) {
        templater = tagFakeTemplater(tag);
    }
    const global = getNewGlobal(contextItem);
    if (appendTo) {
        return processNewSubjectTag(templater, contextItem, ownerSupport, counts, appendTo, insertBefore);
    }
    global.newest = newSupportByTemplater(templater, ownerSupport, contextItem);
    return processTag(ownerSupport, contextItem, counts);
}
//# sourceMappingURL=processDomTagInit.function.js.map