import { destroySupport } from '../../../render/destroySupport.function.js';
import { addPaintRemover } from '../../../render/paint.function.js';
export function runArrayItemDiff(oldKey, newValueTag, prevContext, lastArray, index) {
    const keyValue = newValueTag?.arrayValue;
    /*
    if( keyValue === undefined ) {
      destroyArrayItem(prevContext)
      lastArray.splice(index, 1)
      return 3
    }*/
    const newKey = keyValue || index;
    let isDiff = oldKey !== newKey;
    if (isDiff === false && keyValue === undefined) {
        const hasChanged = prevContext.tagJsVar.hasValueChanged(newValueTag, prevContext, undefined);
        if (hasChanged) {
            isDiff = true;
        }
    }
    if (isDiff) {
        destroyArrayItem(prevContext);
        lastArray.splice(index, 1);
        return 2;
    }
    return 0;
}
export function destroyArrayItem(context) {
    const global = context.global;
    const result = destroyArrayItemByGlobal(global, context);
    destroyArrayMarkers(context);
    return result;
}
function destroyArrayItemByGlobal(global, context) {
    if (global && context.state?.oldest) {
        const support = context.state.oldest;
        return destroySupport(support, global);
    }
    return context.tagJsVar.destroy(context, {});
}
function destroyArrayMarkers(context) {
    context.arrayMarkersDeleted = true;
    const startMarker = context.arrayStartMarker;
    if (startMarker?.parentNode) {
        addPaintRemover(startMarker, 'destroyArrayStartMarker');
    }
    const endMarker = context.placeholder;
    if (endMarker?.parentNode) {
        addPaintRemover(endMarker, 'destroyArrayEndMarker');
    }
}
//# sourceMappingURL=compareArrayItems.function.js.map