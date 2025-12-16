import { paint, painting } from '../../render/paint.function.js';
import { renderSupport } from '../../render/renderSupport.function.js';
export function renderTagUpdateArray(supports) {
    ++painting.locks;
    supports.forEach(mapTagUpdate);
    --painting.locks;
    paint();
}
function mapTagUpdate(support) {
    const context = support.context;
    const global = context.global;
    if (!global) {
        context.tagJsVar.processUpdate(context.value, context, support.ownerSupport, []);
        return; // while rendering a parent, a child may have been deleted (pinbowl)
    }
    const stateMeta = context.state;
    renderSupport(stateMeta.newest);
}
//# sourceMappingURL=renderTagArray.function.js.map