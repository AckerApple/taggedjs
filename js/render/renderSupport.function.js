import { renderExistingSupport } from './renderExistingTag.function.js';
import { ValueTypes } from '../tag/ValueTypes.enum.js';
import { getSupportWithState } from '../interpolations/attributes/getSupportWithState.function.js';
export function isInlineHtml(templater) {
    return ValueTypes.templater === templater.tagJsType;
}
/** Main function used by all other callers to render/update display of a tag component */
export function renderSupport(support) {
    const subject = support.context;
    const global = subject.global;
    const templater = support.templater;
    const inlineHtml = isInlineHtml(templater);
    if (subject.locked) {
        global.blocked.push(support);
        return support;
    }
    // is it just a vanilla tag, not component?
    if (inlineHtml) {
        const result = renderInlineHtml(support);
        return result;
    }
    subject.locked = 4;
    if (global.blocked.length) {
        support = global.blocked.pop();
        global.blocked = [];
    }
    const tag = renderExistingSupport(subject.state.newest, support, subject);
    delete subject.locked;
    return tag;
}
/** Renders the owner of the inline HTML even if the owner itself is inline html */
export function renderInlineHtml(support) {
    const ownerSupport = getSupportWithState(support);
    const ownContext = ownerSupport.context;
    const newest = ownContext.state.newest;
    // Function below may call renderInlineHtml again if owner is just inline HTML
    const result = renderSupport(newest);
    return result;
}
//# sourceMappingURL=renderSupport.function.js.map