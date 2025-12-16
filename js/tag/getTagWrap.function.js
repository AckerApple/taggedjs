import { castProps } from './props/alterProp.function.js';
import { syncFunctionProps } from '../render/update/updateExistingTagComponent.function.js';
import { executeWrap } from '../render/executeWrap.function.js';
import { PropWatches } from '../tagJsVars/tag.function.js';
import { deepCompareDepth, shallowCompareDepth } from './hasSupportChanged.function.js';
import { createSupport } from './createSupport.function.js';
/** creates/returns a function that when called then calls the original component function
 * Gets used as templater.wrapper()
 */
export function getTagWrap(templater, result) {
    // this function gets called by taggedjs
    const wrapper = function tagFunWrap(newSupport, subject, lastSupport // subject.global.newest
    ) {
        // wrap any prop functions that are passed in
        const castedProps = getCastedProps(templater, newSupport, lastSupport);
        const ownerSupport = newSupport.ownerSupport;
        const useSupport = createSupport(templater, subject, ownerSupport, newSupport.appSupport, // ownerSupport.appSupport as AnySupport,
        castedProps);
        return executeWrap(templater, result, useSupport, castedProps);
    };
    return wrapper;
}
export function getCastedProps(templater, newSupport, lastSupport) {
    const maxDepth = templater.propWatch === PropWatches.DEEP ? deepCompareDepth : shallowCompareDepth;
    const props = templater.props;
    const propsConfig = newSupport.propsConfig;
    // When defined, this must be an update where my new props have already been made for me
    let preCastedProps = propsConfig.castProps;
    const lastPropsConfig = lastSupport?.propsConfig;
    const lastCastProps = lastPropsConfig?.castProps;
    if (lastCastProps) {
        propsConfig.castProps = lastCastProps;
        preCastedProps = syncFunctionProps(newSupport, lastSupport, lastSupport.ownerSupport, props, maxDepth);
    }
    const castedProps = preCastedProps || castProps(props, newSupport, 0);
    return castedProps;
}
//# sourceMappingURL=getTagWrap.function.js.map