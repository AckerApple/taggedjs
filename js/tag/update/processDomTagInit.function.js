import { newSupportByTemplater, processTag, tagFakeTemplater } from '../../render/update/processTag.function.js';
import { getNewGlobal } from './getNewGlobal.function.js';
import { processNewSubjectTag } from './processNewSubjectTag.function.js';
export function processDomTagInit(value, // StringTag,
contextItem, // could be tag via result.tag
ownerSupport, // owningSupport
insertBefore, appendTo) {
    const tag = value;
    let templater = tag.templater;
    if (!templater) {
        templater = tagFakeTemplater(tag);
    }
    getNewGlobal(contextItem);
    if (appendTo) {
        return processNewSubjectTag(templater, contextItem, ownerSupport, appendTo, insertBefore);
    }
    const stateMeta = contextItem.state = contextItem.state || {};
    stateMeta.newest = newSupportByTemplater(templater, ownerSupport, contextItem);
    return processTag(ownerSupport, contextItem);
}
//# sourceMappingURL=processDomTagInit.function.js.map