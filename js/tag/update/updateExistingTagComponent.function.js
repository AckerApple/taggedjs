import { hasTagSupportChanged } from '../hasTagSupportChanged.function.js';
import { processSubjectComponent } from './processSubjectComponent.function.js';
import { destroyTagMemory } from '../destroyTag.function.js';
import { renderTagSupport } from '../render/renderTagSupport.function.js';
import { callbackPropOwner } from '../../alterProp.function.js';
import { isLikeTags } from '../isLikeTags.function.js';
import { setUse } from '../../state/setUse.function.js';
export function updateExistingTagComponent(ownerSupport, tagSupport, // lastest
subject, insertBefore) {
    let lastSupport = subject.tagSupport?.global.newest;
    let oldestTag = lastSupport.global.oldest;
    const oldWrapper = lastSupport.templater.wrapper;
    const newWrapper = tagSupport.templater.wrapper;
    let isSameTag = false;
    if (oldWrapper && newWrapper) {
        const oldFunction = oldWrapper.parentWrap.original;
        const newFunction = newWrapper.parentWrap.original;
        // string compare both functions
        isSameTag = oldFunction === newFunction;
    }
    const templater = tagSupport.templater;
    if (!isSameTag) {
        const oldestSupport = lastSupport.global.oldest;
        destroyTagMemory(oldestSupport);
        return processSubjectComponent(templater, subject, insertBefore, ownerSupport, {
            counts: { added: 0, removed: 0 },
        });
    }
    else {
        const hasChanged = hasTagSupportChanged(lastSupport, tagSupport, templater);
        if (!hasChanged) {
            const newProps = templater.props;
            syncFunctionProps(tagSupport, lastSupport, ownerSupport, newProps);
            return lastSupport; // its the same tag component
        }
    }
    const previous = lastSupport.global.newest;
    const newSupport = renderTagSupport(tagSupport, false);
    lastSupport = subject.tagSupport;
    const newOldest = newSupport.global.oldest;
    const hasOldest = newOldest ? true : false;
    if (!hasOldest) {
        return buildNewTag(newSupport, insertBefore, lastSupport, subject);
    }
    if (newOldest && templater.children._value.length) {
        const oldKidsSub = newOldest.templater.children;
        oldKidsSub.next(templater.children._value);
    }
    // detect if both the function is the same and the return is the same
    const isLikeTag = isSameTag && isLikeTags(previous, newSupport);
    if (isLikeTag) {
        subject.tagSupport = newSupport;
        oldestTag.updateBy(newSupport); // the oldest tag has element references
        return newSupport;
    }
    else {
        // Although function looked the same it returned a different html result
        if (isSameTag && lastSupport) {
            destroyTagMemory(lastSupport);
            newSupport.global.context = {}; // do not share previous outputs
        }
        oldestTag = undefined;
    }
    if (!oldestTag) {
        lastSupport = newSupport;
        buildNewTag(newSupport, lastSupport.global.insertBefore, lastSupport, subject);
    }
    lastSupport.global.newest = newSupport;
    return newSupport;
}
function buildNewTag(newSupport, oldInsertBefore, oldTagSupport, subject) {
    newSupport.buildBeforeElement(oldInsertBefore, {
        counts: { added: 0, removed: 0 },
    });
    newSupport.global.oldest = newSupport;
    newSupport.global.newest = newSupport;
    oldTagSupport.global.oldest = newSupport;
    oldTagSupport.global.newest = newSupport;
    subject.tagSupport = newSupport;
    return newSupport;
}
function syncFunctionProps(newSupport, lastSupport, ownerSupport, newPropsArray) {
    lastSupport = lastSupport.global.newest || lastSupport;
    const stateArray = setUse.memory.stateConfig.array;
    for (let index = newPropsArray.length - 1; index >= 0; --index) {
        const prop = newPropsArray[index];
        const priorPropConfig = lastSupport.propsConfig;
        const priorPropsArray = priorPropConfig.latestCloned;
        const priorProp = priorPropsArray[index];
        newPropsArray[index] = syncPriorPropFunction(priorProp, prop, newSupport, ownerSupport);
    }
}
function syncPriorPropFunction(priorProp, prop, newSupport, ownerSupport, index, propOwner, seen = []) {
    if (priorProp instanceof Function) {
        if (prop.toCall) {
            return prop;
        }
        const ownerGlobal = ownerSupport.global;
        const prevOwnerSupport = ownerGlobal.newest;
        const oldOwnerState = ownerGlobal.oldest.memory.state;
        priorProp.toCall = (...args) => {
            return callbackPropOwner(prop, args, prevOwnerSupport, prevOwnerSupport.memory.state);
        };
        // The newer needs to be wrapped to trigger renders
        // return result
        return prop;
    }
    if (seen.includes(prop)) {
        return prop;
    }
    seen.push(prop);
    if (typeof (prop) !== 'object' || !prop) {
        return prop; // no children to crawl through
    }
    if (prop instanceof Array) {
        prop.forEach((x, index) => prop[index] = syncPriorPropFunction(priorProp[index], x, newSupport, ownerSupport, index, prop, seen));
        return prop;
    }
    for (const name in prop) {
        const subValue = prop[name];
        const result = syncPriorPropFunction(priorProp[name], subValue, newSupport, ownerSupport, name, prop, seen);
        const hasSetter = typeof (result) === 'object' || Object.getOwnPropertyDescriptor(prop, name)?.set;
        if (hasSetter) {
            continue;
        }
        prop[name] = result;
    }
    return prop;
}
//# sourceMappingURL=updateExistingTagComponent.function.js.map