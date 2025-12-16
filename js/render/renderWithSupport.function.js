import { moveProviders } from './update/updateExistingTagComponent.function.js';
import { softDestroySupport } from './softDestroySupport.function.js';
import { firstTagRender, getSupportOlderState, reRenderTag } from './renderTagOnly.function.js';
import { isLikeTags } from '../tag/isLikeTags.function.js';
import { ValueTypes } from '../tag/ValueTypes.enum.js';
/** TODO: This seems to support both new and updates and should be separated? */
export function renderWithSupport(newSupport, lastSupport, // previous (global.newest)
context) {
    let reSupport;
    const olderState = getSupportOlderState(lastSupport);
    // const olderState = getSupportNewerState(lastSupport)
    if (olderState) {
        reSupport = reRenderTag(newSupport, lastSupport, context);
    }
    else {
        reSupport = firstTagRender(newSupport, lastSupport, context);
    }
    const isLikeTag = !lastSupport || isLikeTags(lastSupport, reSupport);
    if (!isLikeTag) {
        moveProviders(lastSupport, reSupport);
        softDestroySupport(lastSupport);
        const context = reSupport.context;
        context.state.oldest = reSupport;
        context.state.newest = reSupport;
        // context.state.older = context.state.newer
    }
    else if (lastSupport) {
        const tag = lastSupport.templater.tag;
        if (tag && context.renderCount > 0) {
            const lastTemplater = lastSupport?.templater;
            const lastTag = lastTemplater?.tag;
            checkTagSoftDestroy(tag, lastSupport, lastTag);
        }
        // context.state.older = context.state.newer
        // context.state.newer = context.state.older
    }
    reSupport.ownerSupport = newSupport.ownerSupport; // || lastOwnerSupport) as AnySupport
    return {
        support: reSupport,
        wasLikeTags: isLikeTag
    };
}
function checkTagSoftDestroy(tag, lastSupport, lastTag) {
    if (tag.tagJsType === ValueTypes.dom) {
        const lastDom = lastTag?.dom;
        const newDom = tag.dom;
        if (lastDom !== newDom) {
            softDestroySupport(lastSupport);
        }
        return;
    }
    if (lastTag) {
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