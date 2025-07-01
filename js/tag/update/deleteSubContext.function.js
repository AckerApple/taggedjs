import { addPaintRemover } from '../../render/paint.function.js';
export function deleteSubContext(contextItem, ownerSupport) {
    const subscription = contextItem.subContext;
    subscription.deleted = true;
    delete contextItem.subContext;
    const appendMarker = subscription.appendMarker;
    if (appendMarker) {
        addPaintRemover(appendMarker);
        delete subscription.appendMarker;
    }
    delete contextItem.delete;
    // contextItem.handler = tagValueUpdateHandler
    // const tagJsVar = contextItem.tagJsVar as TagJsVar
    //tagJsVar.processUpdate = tagValueUpdateHandler
    if (!subscription.hasEmitted) {
        return;
    }
    const subContextItem = subscription.contextItem;
    const subTagJsVar = subContextItem.tagJsVar;
    subTagJsVar.delete(subContextItem, ownerSupport);
    return 76;
}
//# sourceMappingURL=deleteSubContext.function.js.map