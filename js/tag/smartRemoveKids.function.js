import { destroyArray } from './destroyArrayContext.function.js';
import { addPaintRemover } from '../render/paint.function.js';
import { destroyHtmlDomMeta } from './destroyHtmlDomMeta.function.js';
import { isPromise } from '../index.js';
/** sets global.deleted on support and all children */
export function smartRemoveKids(context, allPromises) {
    const subContexts = context.contexts;
    smartRemoveByContext(subContexts, allPromises);
    destroyHtmlDomMeta(context.htmlDomMeta);
}
function smartRemoveByContext(contexts, allPromises) {
    for (const context of contexts) {
        if (context.withinOwnerElement) {
            const TagJsTag = context.tagJsVar;
            if (TagJsTag && TagJsTag.tagJsType === 'host') {
                const newest = context.supportOwner;
                const hostDestroy = TagJsTag.destroy(context, newest);
                if (isPromise(hostDestroy)) {
                    allPromises.push(hostDestroy);
                }
            }
            continue; // i live within my owner variable. I will be deleted with owner
        }
        const lastArray = context.lastArray;
        if (lastArray) {
            destroyArray(context, lastArray);
            continue;
        }
        // regular values, no placeholders
        const elm = context.simpleValueElm;
        if (elm) {
            delete context.simpleValueElm;
            addPaintRemover(elm, 'smartRemoveByContext');
            continue;
        }
        const subGlobal = context.global;
        if (subGlobal === undefined) {
            continue; // context
        }
        subGlobal.deleted = true;
        const oldest = context.state?.oldest;
        if (oldest) {
            smartRemoveKids(context, allPromises);
            continue;
        }
    }
}
//# sourceMappingURL=smartRemoveKids.function.js.map