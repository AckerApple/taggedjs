import { oneRenderToSupport } from '../../tag/update/oneRenderToSupport.function.js';
import { firstTagRender } from '../renderTagOnly.function.js';
import { getNewGlobal } from '../../tag/update/getNewGlobal.function.js';
import { processNewSubjectTag } from '../../tag/update/processNewSubjectTag.function.js';
export function processRenderOnceInit(value, contextItem, // could be tag via result.tag
ownerSupport, // owningSupport
insertBefore, appendTo) {
    getNewGlobal(contextItem);
    const support = oneRenderToSupport(value, contextItem, ownerSupport);
    firstTagRender(support, undefined, contextItem);
    return processNewSubjectTag(support.templater, contextItem, ownerSupport, appendTo, insertBefore);
}
//# sourceMappingURL=processRenderOnceInit.function.js.map