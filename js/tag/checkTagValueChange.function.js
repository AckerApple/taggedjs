import { getNewGlobal } from './update/getNewGlobal.function.js';
import { destroySupport } from '../render/destroySupport.function.js';
import { isStaticTag } from '../isInstance.js';
import { isLikeTags } from './isLikeTags.function.js';
import { tryUpdateToTag } from './update/tryUpdateToTag.function.js';
export function checkTagValueChange(newValue, contextItem) {
    const global = contextItem.global;
    if (!global) {
        return 663; // its not a tag this time
    }
    const lastSupport = global?.newest;
    const isValueTag = isStaticTag(newValue);
    const newTag = newValue;
    if (isValueTag) {
        // its a different tag now
        const likeTags = isLikeTags(newTag, lastSupport);
        if (!likeTags) {
            destroySupport(lastSupport, global);
            getNewGlobal(contextItem);
            return 7; // 'tag-swap'
        }
        return 77; // always cause a redraw of static tags (was false)
    }
    const isTag = newValue?.tagJsType;
    if (isTag) {
        const support = global.newest;
        const ownerSupport = support.ownerSupport;
        const result = tryUpdateToTag(contextItem, newValue, ownerSupport);
        const doNotRedraw = result === true;
        if (doNotRedraw) {
            return -1;
        }
        return 88; // its same tag with new values
    }
    destorySupportByContextItem(contextItem);
    return 8; // 'no-longer-tag'
}
export function destorySupportByContextItem(contextItem) {
    const global = contextItem.global;
    const lastSupport = global?.newest;
    // destroy old component, value is not a component
    destroySupport(lastSupport, global);
    delete contextItem.global;
    contextItem.renderCount = 0;
}
//# sourceMappingURL=checkTagValueChange.function.js.map