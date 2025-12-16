import { deepEqual } from '../deepFunctions.js';
import { PropWatches } from '../index.js';
import { deepCompareDepth, immutablePropMatch } from '../tag/hasSupportChanged.function.js';
import { shallowPropMatch } from '../tag/shallowPropMatch.function.js';
export function checkRenderUp(templater, support) {
    const global = support.context.global;
    if (global && global.deleted) {
        return false;
    }
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
//# sourceMappingURL=checkRenderUp.function.js.map