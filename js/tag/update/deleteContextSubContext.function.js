import { addPaintRemover } from '../../render/paint.function.js';
export function deleteContextSubContext(contextItem, ownerSupport) {
    ++contextItem.updateCount;
    const subscription = contextItem.subContext;
    const result = deleteSubContext(subscription, ownerSupport);
    delete contextItem.subContext;
    return result;
}
export function deleteSubContext(subContext, ownerSupport) {
    subContext.deleted = true;
    const appendMarker = subContext.appendMarker;
    if (appendMarker) {
        addPaintRemover(appendMarker, 'deleteSubContext');
        delete subContext.appendMarker;
    }
    // delete (contextItem as any).destroy
    if (!subContext.hasEmitted) {
        return;
    }
    const subContextItem = subContext.contextItem;
    const subTagJsTag = subContextItem.tagJsVar;
    subTagJsTag.destroy(subContextItem, ownerSupport);
    return 76;
}
//# sourceMappingURL=deleteContextSubContext.function.js.map