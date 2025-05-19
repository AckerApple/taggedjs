import { deepCompareDepth, hasSupportChanged, shallowCompareDepth } from '../../tag/hasSupportChanged.function.js';
import { processReplacementComponent } from '../../tag/update/processFirstSubjectComponent.function.js';
import { castProps } from '../../tag/props/alterProp.function.js';
import { renderSupport } from '../renderSupport.function.js';
import { ValueTypes } from '../../tag/ValueTypes.enum.js';
import { destroySupport } from '../destroySupport.function.js';
import { getNewGlobal } from '../../tag/update/getNewGlobal.function.js';
import { isLikeTags } from '../../tag/isLikeTags.function.js';
import { PropWatches } from '../../tag/tag.function.js';
import { syncPriorPropFunction } from '../../tag/update/syncPriorPropFunction.function.js';
export function updateExistingTagComponent(ownerSupport, support, // lastest
subject) {
    const global = subject.global;
    const lastSupport = global.newest;
    const oldWrapper = lastSupport.templater.wrapper;
    const newWrapper = support.templater.wrapper;
    let isSameTag = false;
    const tagJsType = support.templater.tagJsType;
    const skipComparing = ValueTypes.stateRender === tagJsType || ValueTypes.renderOnce === tagJsType;
    if (skipComparing) {
        isSameTag = support.templater.tagJsType === ValueTypes.renderOnce || isLikeTags(lastSupport, support);
    }
    else if (oldWrapper && newWrapper) {
        const oldFunction = oldWrapper.original;
        const newFunction = newWrapper.original;
        // string compare both functions
        isSameTag = oldFunction === newFunction;
    }
    const templater = support.templater;
    if (!isSameTag) {
        swapTags(subject, templater, ownerSupport);
        return;
    }
    const hasChanged = skipComparing || hasSupportChanged(lastSupport, templater);
    // everyhing has matched, no display needs updating.
    if (!hasChanged) {
        const maxDepth = templater.propWatch === PropWatches.DEEP ? deepCompareDepth : shallowCompareDepth;
        syncSupports(templater, support, lastSupport, ownerSupport, maxDepth);
        return;
    }
    if (global.locked) {
        global.blocked.push(support);
        return;
    }
    renderSupport(support);
    ++subject.renderCount;
    return;
}
export function syncFunctionProps(newSupport, lastSupport, ownerSupport, newPropsArray, // templater.props
maxDepth, depth = -1) {
    const subject = lastSupport.subject;
    const global = subject.global;
    const newest = global.newest;
    if (!newest) {
        const castedProps = castProps(newPropsArray, newSupport, depth);
        newPropsArray.push(...castedProps);
        const propsConfig = newSupport.propsConfig;
        propsConfig.castProps = castedProps;
        return newPropsArray;
    }
    lastSupport = newest || lastSupport;
    const priorPropConfig = lastSupport.propsConfig;
    const priorPropsArray = priorPropConfig.castProps;
    const newArray = [];
    for (let index = 0; index < newPropsArray.length; ++index) {
        const prop = newPropsArray[index];
        const priorProp = priorPropsArray[index];
        const newValue = syncPriorPropFunction(priorProp, prop, newSupport, ownerSupport, maxDepth, depth + 1);
        newArray.push(newValue);
    }
    const newPropsConfig = newSupport.propsConfig;
    newPropsConfig.castProps = newArray;
    return newArray;
}
export function moveProviders(lastSupport, newSupport) {
    const global = lastSupport.subject.global;
    let pIndex = -1;
    const providers = global.providers = global.providers || [];
    const pLen = providers.length - 1;
    while (pIndex++ < pLen) {
        const provider = providers[pIndex];
        let index = -1;
        const pcLen = provider.children.length - 1;
        while (index++ < pcLen) {
            const child = provider.children[index];
            const wasSameGlobals = global === child.subject.global;
            if (wasSameGlobals) {
                provider.children.splice(index, 1);
                provider.children.push(newSupport);
                return;
            }
        }
    }
}
/** Exchanges entire propsConfigs */
function syncSupports(templater, support, lastSupport, ownerSupport, maxDepth) {
    // update function refs to use latest references
    const newProps = templater.props;
    const castedProps = syncFunctionProps(support, lastSupport, ownerSupport, newProps, maxDepth);
    const propsConfig = support.propsConfig;
    // When new support actually makes call to real function, use these pre casted props
    propsConfig.castProps = castedProps;
    const lastPropsConfig = lastSupport.propsConfig;
    // update support to think it has different cloned props
    lastPropsConfig.latest = propsConfig.latest;
    return lastSupport; // its the same tag component  
}
/** Was tag, will be tag */
function swapTags(subject, templater, // new tag
ownerSupport) {
    const global = subject.global;
    const oldestSupport = global.oldest;
    destroySupport(oldestSupport, global);
    getNewGlobal(subject);
    const newSupport = processReplacementComponent(templater, subject, ownerSupport, { added: 0, removed: 0 });
    return newSupport;
}
//# sourceMappingURL=updateExistingTagComponent.function.js.map