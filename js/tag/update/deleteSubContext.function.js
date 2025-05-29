import { paintCommands, paintRemover } from '../../render/paint.function.js';
import { tagValueUpdateHandler } from './tagValueUpdateHandler.function.js';
export function deleteSubContext(contextItem, ownerSupport) {
    const subscription = contextItem.subContext;
    subscription.deleted = true;
    delete contextItem.subContext;
    const appendMarker = subscription.appendMarker;
    if (appendMarker) {
        paintCommands.push([paintRemover, [appendMarker]]);
        delete subscription.appendMarker;
    }
    delete contextItem.delete;
    contextItem.handler = tagValueUpdateHandler;
    if (!subscription.hasEmitted) {
        return;
    }
    const subContextItem = subscription.contextItem;
    const tagJsVar = subContextItem.tagJsVar;
    tagJsVar.delete(subContextItem, ownerSupport);
    return 77;
}
//# sourceMappingURL=deleteSubContext.function.js.map