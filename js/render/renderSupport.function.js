import { deepEqual } from '../deepFunctions.js';
import { renderExistingSupport } from './renderExistingTag.function.js';
import { ValueTypes } from '../tag/ValueTypes.enum.js';
import { PropWatches } from '../index.js';
import { deepCompareDepth, immutablePropMatch, shallowPropMatch } from '../tag/hasSupportChanged.function.js';
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
    subject.locked = true;
    if (global.blocked.length) {
        support = global.blocked.pop();
        global.blocked = [];
    }
    const tag = renderExistingSupport(global.newest, support, subject);
    delete subject.locked;
    return tag;
}
/** Renders the owner of the inline HTML even if the owner itself is inline html */
export function renderInlineHtml(support) {
    const ownerSupport = getSupportWithState(support);
    const ownGlobal = ownerSupport.context.global;
    const newest = ownGlobal.newest;
    // Function below may call renderInlineHtml again if owner is just inline HTML
    const result = renderSupport(newest);
    return result;
}
export function checkRenderUp(templater, support) {
    const selfPropChange = hasPropsToOwnerChanged(templater, support);
    // render owner up first and that will cause me to re-render
    if (selfPropChange) {
        return true;
    }
    return false;
}
/** Used when crawling up the chain of child-to-parent tags. See hasSupportChanged for the downward direction */
function hasPropsToOwnerChanged(templater, support) {
    const nowProps = templater.props;
    const propsConfig = support.propsConfig;
    const latestProps = propsConfig.latest;
    const compareLen = hasPropLengthsChanged(nowProps, latestProps);
    if (compareLen) {
        return true;
    }
    switch (templater.propWatch) {
        case PropWatches.IMMUTABLE:
            return immutablePropMatch(nowProps, latestProps);
        case PropWatches.SHALLOW:
            return shallowPropMatch(nowProps, latestProps);
    }
    return !deepEqual(nowProps, latestProps, deepCompareDepth);
}
export function hasPropLengthsChanged(nowProps, latestProps) {
    const nowLen = nowProps.length;
    const latestLen = latestProps.length;
    return nowLen !== latestLen;
}
//# sourceMappingURL=renderSupport.function.js.map