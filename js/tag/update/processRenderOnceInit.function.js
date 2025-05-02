import { checkTagValueChange } from '../checkTagValueChange.function.js';
import { oneRenderToSupport } from './oneRenderToSupport.function.js';
import { renderTagOnly } from '../render/renderTagOnly.function.js';
import { getNewGlobal } from './getNewGlobal.function.js';
import { processNewSubjectTag } from './processNewSubjectTag.function.js';
export function processRenderOnceInit(value, contextItem, // could be tag via result.tag
ownerSupport, // owningSupport
counts, // {added:0, removed:0}
appendTo, insertBefore) {
    getNewGlobal(contextItem);
    const support = oneRenderToSupport(value, contextItem, ownerSupport);
    renderTagOnly(support, undefined, contextItem, ownerSupport);
    const result = processNewSubjectTag(support.templater, contextItem, ownerSupport, counts, appendTo, insertBefore);
    contextItem.checkValueChange = checkTagValueChange;
    return result;
}
//# sourceMappingURL=processRenderOnceInit.function.js.map