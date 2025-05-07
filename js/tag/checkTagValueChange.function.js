import { getNewGlobal } from './update/getNewGlobal.function.js';
import { destroySupport } from './destroySupport.function.js';
import { isStaticTag } from '../isInstance.js';
import { isLikeTags } from './isLikeTags.function.js';
import { tryUpdateToTag } from './update/tryUpdateToTag.function.js';
import { paint, paintAfters } from './paint.function.js';
export function checkTagValueChange(newValue, contextItem) {
    const global = contextItem.global;
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
        return false;
    }
    const isTag = newValue?.tagJsType;
    if (isTag) {
        const support = global.newest;
        const ownerSupport = support.ownerSupport;
        const result = tryUpdateToTag(contextItem, newValue, ownerSupport);
        return result === true ? -1 : false;
    }
    // A subject could have emitted twice in one render cycle
    if (lastSupport.subject.renderCount === 0) {
        delete contextItem.global;
        contextItem.renderCount = 0;
        paintAfters.push(() => {
            destroySupport(lastSupport, global);
            paintAfters.shift(); // prevent endless recursion
            paint();
        });
        return 8; // never rendered
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