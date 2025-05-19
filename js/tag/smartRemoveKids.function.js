import { destroyArray } from './checkDestroyPrevious.function.js';
import { paint, paintCommands, painting, paintRemover } from '../render/paint.function.js';
/** sets global.deleted on support and all children */
export function smartRemoveKids(global, allPromises) {
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
const promises = [];
function destroyCall(destroy) {
    const maybePromise = destroy();
    const isPromise = maybePromise instanceof Promise;
    if (isPromise) {
        promises.push(maybePromise);
    }
}
// Elements that have a destroy or ondestroy attribute
function processContextDestroys(destroys, global, allPromises) {
    promises.length = 0;
    destroys.forEach(destroyCall);
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
            paintCommands.push({
                processor: paintRemover,
                args: [elm],
            });
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
            smartRemoveKids(subGlobal, allPromises);
            continue;
        }
    }
}
/** Destroy dom elements and dom space markers */
function destroyClones(global) {
    const htmlDomMeta = global.htmlDomMeta;
    // check subjects that may have clones attached to them
    htmlDomMeta.forEach(destroyClone);
}
function destroyClone(clone) {
    const marker = clone.marker;
    if (marker) {
        paintCommands.push({
            processor: paintRemover,
            args: [marker],
        });
    }
    const dom = clone.domElement;
    if (!dom) {
        return;
    }
    paintCommands.push({
        processor: paintRemover,
        args: [dom],
    });
}
//# sourceMappingURL=smartRemoveKids.function.js.map