import { hasPropChanges } from './hasPropChanges.function.js';
/** Used when deciding if a support will even change (are the arguments the same?) */
export function hasSupportChanged(oldSupport, newTemplater) {
    const latestProps = newTemplater.props;
    const propsConfig = oldSupport.propsConfig;
    const pastCloneProps = propsConfig.latest;
    const propsChanged = hasPropChanges(latestProps, pastCloneProps, oldSupport.templater.propWatch);
    return propsChanged;
}
export function immutablePropMatch(props, pastCloneProps) {
    // if every prop the same, then no changes
    const len = props.length;
    for (let index = 0; index < len; ++index) {
        const prop = props[index];
        const pastProp = pastCloneProps[index];
        if (prop !== pastProp) {
            return 2;
        }
    }
    return false; // false means has not changed
}
export const shallowCompareDepth = 3;
export const deepCompareDepth = 10;
//# sourceMappingURL=hasSupportChanged.function.js.map