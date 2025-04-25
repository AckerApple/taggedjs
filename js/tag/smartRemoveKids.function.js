import { destroyArray } from './checkDestroyPrevious.function.js';
import { paint, painting, paintRemoves } from './paint.function.js';
/** sets global.deleted on support and all children */
export function smartRemoveKids(support, global, allPromises) {
    const subject = support.subject;
    const context = global.context;
    // already set
    // global.deleted = true
    const destroys = global.destroys;
    if (destroys) {
        return processContextDestroys(destroys, global, allPromises);
    }
    smartRemoveByContext(context, allPromises);
    destroyClones(global);
}
// Elements that have a destroy or ondestroy attribute
function processContextDestroys(destroys, global, allPromises) {
    const promises = [];
    destroys.forEach(destroy => {
        const maybePromise = destroy();
        const isPromise = maybePromise instanceof Promise;
        if (isPromise) {
            promises.push(maybePromise);
        }
    });
    if (promises.length) {
        const lastPromise = Promise.all(promises)
            .then(() => {
            ++painting.locks;
            // continue to remove
            smartRemoveByContext(global.context, allPromises);
            destroyClones(global);
            --painting.locks;
            paint();
        });
        // run destroy animations
        allPromises.push(lastPromise);
        return;
    }
    ++painting.locks;
    smartRemoveByContext(global.context, allPromises);
    destroyClones(global);
    --painting.locks;
    paint();
}
function smartRemoveByContext(context, allPromises) {
    for (const subject of context) {
        if (subject.withinOwnerElement) {
            continue; // i live within my owner variable. I will be deleted with owner
        }
        const lastArray = subject.lastArray;
        if (lastArray) {
            destroyArray(subject, lastArray);
            continue;
        }
        // regular values, no placeholders
        const elm = subject.simpleValueElm;
        if (elm) {
            delete subject.simpleValueElm;
            paintRemoves.push(elm);
            continue;
        }
        const subGlobal = subject.global;
        if (subGlobal === undefined) {
            continue; // subject
        }
        if (subGlobal.deleted === true) {
            continue; // already deleted
        }
        subGlobal.deleted = true;
        const oldest = subGlobal.oldest;
        if (oldest) {
            smartRemoveKids(oldest, subGlobal, allPromises);
            continue;
        }
    }
}
/** Destroy dom elements and dom space markers */
function destroyClones(global) {
    // const global = subject.global
    const htmlDomMeta = global.htmlDomMeta;
    // check subjects that may have clones attached to them
    htmlDomMeta.forEach(clone => {
        const marker = clone.marker;
        if (marker) {
            paintRemoves.push(marker);
        }
        const dom = clone.domElement;
        if (!dom) {
            return;
        }
        paintRemoves.push(dom);
    });
    // htmlDomMeta.length = 0
}
//# sourceMappingURL=smartRemoveKids.function.js.map