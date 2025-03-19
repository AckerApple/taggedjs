import { getNewGlobal } from './update/getNewGlobal.function.js';
import { destroySupport } from './destroySupport.function.js';
import { isStaticTag } from '../isInstance.js';
import { isLikeTags } from './isLikeTags.function.js';
import { tryUpdateToTag } from './update/updateExistingValue.function.js';
export function checkTagValueChange(newValue, contextItem) {
    const global = contextItem.global;
    const lastSupport = global?.newest;
    const isValueTag = isStaticTag(newValue);
    const newTag = newValue;
    if (isValueTag) {
        // its a different tag now
        const likeTags = isLikeTags(newTag, lastSupport);
        if (!likeTags) {
            destroySupport(lastSupport);
            getNewGlobal(contextItem);
            return 7; // 'tag-swap'
        }
        return false;
    }
    const isTag = newValue?.tagJsType;
    if (isTag) {
        const support = global.newest;
        const ownerSupport = support.ownerSupport;
        const result = tryUpdateToTag(contextItem, newValue, ownerSupport);
        return result === true ? -1 : false;
    }
    // destroy old component, value is not a component
    destroySupport(lastSupport);
    delete contextItem.global;
    contextItem.renderCount = 0;
    return 8; // 'no-longer-tag'
}
//# sourceMappingURL=checkTagValueChange.function.js.map