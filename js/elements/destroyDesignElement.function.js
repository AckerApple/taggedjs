import { isPromise } from '../index.js';
import { paint, paintCommands, painting } from '../render/paint.function.js';
import { destroyHtmlDomMeta } from '../tag/destroyHtmlDomMeta.function.js';
export function destroyDesignElement(context, ownerSupport) {
    ++context.updateCount;
    const contexts = context.contexts;
    const promises = [];
    if (context.paintCommands) {
        for (let index = paintCommands.length - 1; index >= 0; --index) {
            const paint = paintCommands[index];
            const matchIndex = context.paintCommands.indexOf(paint);
            if (matchIndex >= 0) {
                paintCommands.splice(index, 1);
                context.paintCommands.splice(matchIndex, 1);
                if (context.paintCommands.length === 0) {
                    break;
                }
            }
        }
        delete context.paintCommands;
        afterElementDestroy(context);
        return; // do not continue
    }
    if (contexts.length) {
        destroyDesignByContexts(contexts, ownerSupport, promises);
        contexts.length = 0;
        if (promises.length) {
            const htmlDomMeta = context.htmlDomMeta;
            context.deleted = true;
            return Promise.all(promises).then(() => {
                ++painting.locks;
                destroyHtmlDomMeta(htmlDomMeta);
                afterElementDestroy(context);
                --painting.locks;
                paint();
            });
        }
    }
    destroyHtmlDomMeta(context.htmlDomMeta);
    afterElementDestroy(context);
}
export function afterElementDestroy(context) {
    context.htmlDomMeta = [];
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
        destroyHtmlDomMeta(context.htmlDomMeta);
        delete context.htmlDomMeta;
    }
    if (contexts.length > 1) {
        return destroyDesignByContexts(contexts.slice(1, contexts.length), ownerSupport, promises);
    }
}
//# sourceMappingURL=destroyDesignElement.function.js.map