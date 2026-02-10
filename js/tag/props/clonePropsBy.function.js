import { ValueTypes } from '../ValueTypes.enum.js';
import { cloneTagJsValue } from '../cloneValueArray.function.js';
import { deepCompareDepth, shallowCompareDepth } from '../hasSupportChanged.function.js';
import { PropWatches } from '../../TagJsTags/tag.function.js';
export function clonePropsBy(support, props, castProps) {
    const templater = support.templater;
    if (templater.tagJsType === ValueTypes.stateRender) {
        return;
    }
    switch (templater.propWatch) {
        case PropWatches.IMMUTABLE:
            return support.propsConfig = {
                latest: props,
                castProps,
            };
        case PropWatches.SHALLOW:
            return support.propsConfig = {
                latest: props.map(shallowMapper),
                castProps,
            };
    }
    return support.propsConfig = {
        latest: props.map(deepMapper),
        castProps,
    };
}
function shallowMapper(x) {
    return cloneTagJsValue(x, shallowCompareDepth);
}
function deepMapper(props) {
    return cloneTagJsValue(props, deepCompareDepth);
}
//# sourceMappingURL=clonePropsBy.function.js.map