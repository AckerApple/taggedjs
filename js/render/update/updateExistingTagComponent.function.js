import { deepCompareDepth, hasSupportChanged, shallowCompareDepth } from '../../tag/hasSupportChanged.function.js';
import { castProps } from '../../tag/props/alterProp.function.js';
import { renderSupport } from '../renderSupport.function.js';
import { ValueTypes } from '../../tag/ValueTypes.enum.js';
import { destroySupport } from '../destroySupport.function.js';
import { getNewGlobal } from '../../tag/update/getNewGlobal.function.js';
import { isLikeTags } from '../../tag/isLikeTags.function.js';
import { PropWatches } from '../../tagJsVars/tag.function.js';
import { syncPriorPropFunction } from '../../tag/update/syncPriorPropFunction.function.js';
export function updateExistingTagComponent(ownerSupport, newSupport, // lastest
subject) {
    const global = subject.global;
    const oldSupport = global.newest;
    const oldWrapper = oldSupport.templater.wrapper;
    let newWrapper = newSupport.templater.wrapper;
    let isSameTag = false;
    const tagJsType = newSupport.templater.tagJsType;
    const skipComparing = ValueTypes.stateRender === tagJsType || ValueTypes.renderOnce === tagJsType;
    if (skipComparing) {
        isSameTag = newSupport.templater.tagJsType === ValueTypes.renderOnce || isLikeTags(oldSupport, newSupport);
    }
    else if (oldWrapper && newWrapper) {
        // is this perhaps an outerHTML compare?
        const innerHTML = oldSupport.templater.tag?._innerHTML;
        if (innerHTML) {
            // newWrapper = innerHTML.outerHTML as any as Wrapper
            newWrapper = newSupport.outerHTML;
        }
        const oldFunction = oldWrapper.original;
        const newFunction = newWrapper.original;
        // string compare both functions
        isSameTag = oldFunction === newFunction;
    }
    const templater = newSupport.templater;
    if (!isSameTag) {
        swapTags(subject, templater, ownerSupport);
        return;
    }
    const hasChanged = skipComparing || hasSupportChanged(oldSupport, templater);
    // everyhing has matched, no display needs updating.
    if (!hasChanged) {
        const maxDepth = templater.propWatch === PropWatches.DEEP ? deepCompareDepth : shallowCompareDepth;
        syncSupports(templater, newSupport, oldSupport, ownerSupport, maxDepth);
        return;
    }
    if (subject.locked) {
        global.blocked.push(newSupport);
        return;
    }
    renderSupport(newSupport);
    ++subject.renderCount;
    return;
}
export function syncFunctionProps(newSupport, oldSupport, ownerSupport, newPropsArray, // templater.props
maxDepth, depth = -1) {
    const subject = oldSupport.context;
    const global = subject.global;
    const newest = global.newest;
    if (!newest) {
        const castedProps = castProps(newPropsArray, newSupport, depth);
        newPropsArray.push(...castedProps);
        const propsConfig = newSupport.propsConfig;
        propsConfig.castProps = castedProps;
        return newPropsArray;
    }
    oldSupport = newest || oldSupport;
    const priorPropConfig = oldSupport.propsConfig;
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
export function moveProviders(oldSupport, newSupport) {
    const global = oldSupport.context.global;
    let pIndex = -1;
    const providers = global.providers = global.providers || [];
    const pLen = providers.length - 1;
    while (pIndex++ < pLen) {
        const provider = providers[pIndex];
        let index = -1;
        const pcLen = provider.children.length - 1;
        while (index++ < pcLen) {
            const child = provider.children[index];
            const wasSameGlobals = global === child.context.global;
            if (wasSameGlobals) {
                provider.children.splice(index, 1);
                provider.children.push(newSupport);
                return;
            }
        }
    }
}
/** Exchanges entire propsConfigs */
function syncSupports(templater, support, oldSupport, ownerSupport, maxDepth) {
    // update function refs to use latest references
    const newProps = templater.props;
    const castedProps = syncFunctionProps(support, oldSupport, ownerSupport, newProps, maxDepth);
    const propsConfig = support.propsConfig;
    // When new support actually makes call to real function, use these pre casted props
    propsConfig.castProps = castedProps;
    const lastPropsConfig = oldSupport.propsConfig;
    // update support to think it has different cloned props
    lastPropsConfig.latest = propsConfig.latest;
    return oldSupport; // its the same tag component  
}
/** Was tag, will be tag */
function swapTags(contextItem, templater, // new tag
ownerSupport) {
    const global = contextItem.global;
    const oldestSupport = global.oldest;
    destroySupport(oldestSupport, global);
    getNewGlobal(contextItem);
    templater.processInit(templater, contextItem, ownerSupport, { added: 0, removed: 0 }, undefined, // appendTo,
    contextItem.placeholder);
}
//# sourceMappingURL=updateExistingTagComponent.function.js.map