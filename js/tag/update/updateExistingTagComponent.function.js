import { hasSupportChanged } from '../hasSupportChanged.function.js';
import { processSubjectComponent } from './processSubjectComponent.function.js';
import { destroyTagMemory } from '../destroyTag.function.js';
import { renderSupport } from '../render/renderSupport.function.js';
import { castProps, isSkipPropValue } from '../../alterProp.function.js';
import { isLikeTags } from '../isLikeTags.function.js';
import { afterChildrenBuilt } from './processTag.function.js';
import { softDestroySupport } from '../render/softDestroySupport.function.js';
export function updateExistingTagComponent(ownerSupport, support, // lastest
subject, insertBefore, renderUp = false) {
    let lastSupport = subject.global.newest;
    const oldWrapper = lastSupport.templater.wrapper;
    const newWrapper = support.templater.wrapper;
    let isSameTag = false;
    if (oldWrapper && newWrapper) {
        const oldFunction = oldWrapper.parentWrap.original;
        const newFunction = newWrapper.parentWrap.original;
        // string compare both functions
        isSameTag = oldFunction === newFunction;
    }
    const templater = support.templater;
    if (!isSameTag) {
        const oldestSupport = subject.global.oldest;
        destroyTagMemory(oldestSupport);
        const newSupport = processSubjectComponent(templater, subject, insertBefore, ownerSupport, {
            counts: { added: 0, removed: 0 },
        });
        return newSupport;
    }
    const hasChanged = hasSupportChanged(lastSupport, support, templater);
    // everyhing has matched, no display needs updating.
    if (!hasChanged) {
        // update function refs to use latest references
        const newProps = templater.props;
        const castedProps = syncFunctionProps(support, lastSupport, ownerSupport, newProps);
        // When new support actually makes call to real function, use these pre casted props
        support.propsConfig.castProps = castedProps;
        // update support to think it has different cloned props
        lastSupport.propsConfig.latestCloned = support.propsConfig.latestCloned;
        lastSupport.propsConfig.lastClonedKidValues = support.propsConfig.lastClonedKidValues;
        return lastSupport; // its the same tag component
    }
    const oldest = subject.global.oldest;
    if (subject.global.locked) {
        subject.global.blocked.push(support);
        return support;
    }
    const previous = subject.global.newest;
    const newSupport = renderSupport(support, renderUp);
    return afterTagRender(subject, oldest, templater, previous, newSupport, isSameTag);
}
function afterTagRender(subject, oldest, templater, previous, newSupport, isSameTag) {
    let lastSupport = subject.support;
    if (oldest && templater.children._value.length) {
        const oldKidsSub = oldest.templater.children;
        oldKidsSub.next(templater.children._value);
    }
    // detect if both the function is the same and the return is the same
    const isLikeTag = isSameTag && isLikeTags(previous, newSupport);
    if (isLikeTag) {
        const oldestTag = subject.global.oldest;
        subject.support = newSupport;
        oldestTag.updateBy(newSupport);
        return newSupport;
    }
    // Although function looked the same it returned a different html result
    if (isSameTag && lastSupport) {
        const preGlobal = previous.subject.global;
        if (!preGlobal.deleted) {
            softDestroySupport(previous);
        }
    }
    return buildNewTag(newSupport, subject);
}
function buildNewTag(newSupport, subject) {
    const fragment = newSupport.buildBeforeElement(undefined, {
        counts: { added: 0, removed: 0 },
    });
    // TODO, do we need to clone?
    const children = [...fragment.children];
    const placeholder = subject.global.placeholder;
    const parentNode = placeholder.parentNode;
    parentNode.insertBefore(fragment, placeholder);
    afterChildrenBuilt(children, subject, newSupport);
    subject.global.oldest = newSupport;
    subject.global.newest = newSupport;
    subject.support = newSupport;
    newSupport.ownerSupport.subject.global.childTags.push(newSupport);
    return newSupport;
}
export function syncFunctionProps(newSupport, lastSupport, ownerSupport, newPropsArray, // templater.props
depth = -1) {
    const newest = lastSupport.subject.global.newest;
    if (!newest) {
        const state = ownerSupport.state;
        newPropsArray.length = 0;
        const castedProps = castProps(newPropsArray, newSupport, state, depth);
        newPropsArray.push(...castedProps);
        newSupport.propsConfig.castProps = castedProps;
        return newPropsArray;
    }
    lastSupport = newest || lastSupport;
    const priorPropConfig = lastSupport.propsConfig;
    const priorPropsArray = priorPropConfig.castProps;
    const newArray = [];
    for (let index = 0; index < newPropsArray.length; ++index) {
        const prop = newPropsArray[index];
        const priorProp = priorPropsArray[index];
        const newValue = syncPriorPropFunction(priorProp, prop, newSupport, ownerSupport, depth + 1, index);
        newArray.push(newValue);
    }
    newSupport.propsConfig.castProps = newArray;
    return newArray;
}
function syncPriorPropFunction(priorProp, prop, newSupport, ownerSupport, depth, index) {
    if (priorProp instanceof Function) {
        // the prop i am receiving, is already being monitored/controlled by another parent
        if (prop.mem) {
            priorProp.mem.prop = prop.mem.prop;
            priorProp.mem.stateArray = prop.mem.stateArray;
            return prop;
        }
        const ownerGlobal = ownerSupport.subject.global;
        const oldOwnerState = ownerGlobal.newest.state;
        priorProp.mem.prop = prop;
        priorProp.stateArray = oldOwnerState;
        return priorProp;
    }
    // prevent infinite recursion
    // if(seen.includes(prop)) {
    if (depth === 15) {
        return prop;
    }
    // seen.push(prop)
    if (isSkipPropValue(prop)) {
        return prop; // no children to crawl through
    }
    if (prop instanceof Array) {
        for (let index = prop.length - 1; index >= 0; --index) {
            const x = prop[index];
            prop[index] = syncPriorPropFunction(priorProp[index], x, newSupport, ownerSupport, depth + 1, index);
        }
        return prop;
    }
    if (priorProp === undefined) {
        return prop;
    }
    const keys = Object.keys(prop);
    // for(const name in prop){
    for (const name of keys) {
        const subValue = prop[name];
        const result = syncPriorPropFunction(priorProp[name], subValue, newSupport, ownerSupport, depth + 1, name);
        if (prop[name] === result) {
            continue; // ??? new
        }
        const hasSetter = Object.getOwnPropertyDescriptor(prop, name)?.set;
        if (hasSetter) {
            continue;
        }
        prop[name] = result;
    }
    return prop;
}
export function moveProviders(lastSupport, newSupport) {
    const global = lastSupport.subject.global;
    global.providers.forEach(provider => {
        provider.children.forEach((child, index) => {
            const wasSameGlobals = global.destroy$ === child.subject.global.destroy$;
            if (wasSameGlobals) {
                provider.children.splice(index, 1);
                provider.children.push(newSupport);
                return;
            }
        });
    });
}
//# sourceMappingURL=updateExistingTagComponent.function.js.map