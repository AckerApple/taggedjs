import { isPromise } from '../index.js';
import { paint, painting } from '../render/paint.function.js';
import { destroyHtmlDomMeta } from '../tag/destroyHtmlDomMeta.function.js';
import { destroyContextHtml } from '../tag/smartRemoveKids.function.js';
export function destroyDesignElement(context, ownerSupport) {
    ++context.updateCount;
    const contexts = context.contexts;
    const promises = [];
    if (contexts.length) {
        destroyDesignByContexts(contexts, ownerSupport, promises);
        contexts.length = 0;
        if (promises.length) {
            const htmlDomMeta = context.htmlDomMeta;
            context.deleted = true;
            return Promise.all(promises).then(() => {
                ++painting.locks;
                // destroyContextHtml(context)
                destroyHtmlDomMeta(htmlDomMeta);
                // delete context.htmlDomMeta
                context.htmlDomMeta = [];
                // context.deleted = true
                --painting.locks;
                paint();
            });
        }
    }
    destroyContextHtml(context);
    // delete context.htmlDomMeta
    context.htmlDomMeta = [];
    // context.deleted = true
    delete context.contexts;
    context.deleted = true;
}
export function destroyDesignByContexts(contexts, ownerSupport, promises) {
    const context = contexts[0];
    const result = context.tagJsVar.destroy(context, ownerSupport);
    context.deleted = true;
    if (isPromise(result)) {
        return promises.push(result.then(() => {
            if (contexts.length > 1) {
                return destroyDesignByContexts(contexts.slice(1, contexts.length), ownerSupport, promises);
            }
        }));
    }
    if (context.htmlDomMeta) {
        destroyContextHtml(context);
        delete context.htmlDomMeta;
    }
    if (contexts.length > 1) {
        return destroyDesignByContexts(contexts.slice(1, contexts.length), ownerSupport, promises);
    }
}
//# sourceMappingURL=destroyDesignElement.function.js.map