import { paint, painting } from '../../render/paint.function.js';
// import { renderSupport } from'../../render/renderSupport.function.js'
const noArgs = [];
export function renderTagUpdateArray(supports) {
    ++painting.locks;
    for (let index = 0; index < supports.length; ++index) {
        renderTagUpdateNoPaint(supports[index]);
    }
    --painting.locks;
    paint();
}
export function renderTagUpdate(support) {
    ++painting.locks;
    renderTagUpdateNoPaint(support);
    --painting.locks;
    paint();
}
function renderTagUpdateNoPaint(support) {
    const context = support.context;
    context.tagJsVar.processUpdate(context.value, context, support.ownerSupport, noArgs);
}
//# sourceMappingURL=renderTagArray.function.js.map