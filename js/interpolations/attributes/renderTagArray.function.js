import { paint, painting } from '../../render/paint.function.js';
// import { renderSupport } from'../../render/renderSupport.function.js'
export function renderTagUpdateArray(supports) {
    ++painting.locks;
    supports.forEach(mapTagUpdate);
    --painting.locks;
    paint();
}
function mapTagUpdate(support) {
    const context = support.context;
    context.tagJsVar.processUpdate(context.value, context, support.ownerSupport, []);
}
//# sourceMappingURL=renderTagArray.function.js.map