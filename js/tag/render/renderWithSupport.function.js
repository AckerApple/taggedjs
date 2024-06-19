import { isLikeTags } from '../isLikeTags.function.js';
import { renderTagOnly } from './renderTagOnly.function.js';
import { destroyUnlikeTags } from './destroyUnlikeTags.function.js';
import { softDestroySupport } from './softDestroySupport.function.js';
import { ValueTypes } from '../ValueTypes.enum.js';
import { deepEqual } from '../../deepFunctions.js';
export function renderWithSupport(newSupport, lastSupport, // previous
subject, // events & memory
ownerSupport) {
    const lastTemplater = lastSupport?.templater;
    const lastTag = lastTemplater?.tag;
    const reSupport = renderTagOnly(newSupport, lastSupport, subject, ownerSupport);
    const isLikeTag = !lastSupport || isLikeTags(lastSupport, reSupport);
    if (!isLikeTag) {
        destroyUnlikeTags(lastSupport, reSupport, subject);
    }
    else if (lastSupport) {
        const tag = reSupport.templater.tag;
        if (tag) {
            checkTagSoftDestroy(tag, lastSupport, lastTag);
        }
    }
    const lastOwnerSupport = lastSupport?.ownerSupport;
    reSupport.ownerSupport = (ownerSupport || lastOwnerSupport);
    return reSupport;
}
function checkTagSoftDestroy(tag, lastSupport, lastTag) {
    if (tag.tagJsType === ValueTypes.dom) {
        const lastDom = lastTag?.dom;
        const newDom = tag.dom;
        if (!deepEqual(lastDom, newDom)) {
            softDestroySupport(lastSupport);
        }
        return;
    }
    if (lastTag) {
        if (lastTag.tagJsType === ValueTypes.dom) {
            throw new Error('check here');
        }
        const lastStrings = lastTag.strings;
        if (lastStrings) {
            const oldLength = lastStrings?.length;
            const newLength = tag.strings.length;
            if (oldLength !== newLength) {
                softDestroySupport(lastSupport);
            }
        }
    }
}
//# sourceMappingURL=renderWithSupport.function.js.map